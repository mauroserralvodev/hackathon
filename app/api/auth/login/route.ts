// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

type ApiUser = {
  first_name?: string;
  second_name?: string;
  phone_number: string;
  active_flag?: boolean;
  user_id?: number; // ignoramos
  role_id: number;
};

type ApiRole = {
  role_name: string;
  description?: string;
  role_id: number;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://a220-95-215-123-97.ngrok-free.app";

function normalizePhone(input: string) {
  return input.replace(/[^\d+]/g, "").trim();
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
  }

  return (await res.json()) as T;
}

async function fetchUserByPhone(phone: string): Promise<ApiUser> {
  const candidates: Array<() => Promise<ApiUser>> = [
    () => fetchJson<ApiUser>(`${API_BASE}/users/by-phone/${encodeURIComponent(phone)}`),
    () => fetchJson<ApiUser>(`${API_BASE}/users/phone/${encodeURIComponent(phone)}`),
    () => fetchJson<ApiUser>(`${API_BASE}/users/${encodeURIComponent(phone)}`),
    () =>
      fetchJson<ApiUser>(`${API_BASE}/users/login`, {
        method: "POST",
        body: JSON.stringify({ phone_number: phone }),
      }),
    () =>
      fetchJson<ApiUser>(`${API_BASE}/login`, {
        method: "POST",
        body: JSON.stringify({ phone_number: phone }),
      }),
  ];

  let lastErr: unknown = null;
  for (const fn of candidates) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("User lookup failed");
}

async function fetchRole(roleId: number): Promise<ApiRole | null> {
  const candidates: Array<() => Promise<ApiRole>> = [
    () => fetchJson<ApiRole>(`${API_BASE}/roles/${roleId}`),
    () => fetchJson<ApiRole>(`${API_BASE}/role/${roleId}`),
  ];

  for (const fn of candidates) {
    try {
      return await fn();
    } catch {
      // ignore
    }
  }
  return null;
}

function isAdminUser(user: ApiUser, roleName?: string) {
  const rn = (roleName || "").toLowerCase();
  if (rn.includes("admin") || rn.includes("network")) return true;

  // Fallback: si aún no está claro, podéis fijar convenciones
  // (por ejemplo: role_id === 1 => admin)
  if (user.role_id === 1) return true;

  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const phoneRaw = String(body?.phone_number || "");
    const phone = normalizePhone(phoneRaw);

    if (!phone) {
      return NextResponse.json(
        { error: "phone_number is required" },
        { status: 400 }
      );
    }

    const user = await fetchUserByPhone(phone);

    if (user.active_flag === false) {
      return NextResponse.json({ error: "User is inactive" }, { status: 403 });
    }

    const role = await fetchRole(user.role_id);
    const admin = isAdminUser(user, role?.role_name);

    return NextResponse.json({
      user: {
        first_name: user.first_name || "",
        second_name: user.second_name || "",
        phone_number: user.phone_number,
        role_id: user.role_id,
        role_name: role?.role_name || "",
      },
      redirect_to: admin ? "/dash/admin" : "/dash/staff",
    });
  } catch (err) {
    console.error("API login error:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}