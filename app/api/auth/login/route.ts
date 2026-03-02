// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://a220-95-215-123-97.ngrok-free.app";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "").trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: "username and password are required" },
        { status: 400 }
      );
    }

    const upstreamRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    // Si NO es 200-299, devolvemos invalid credentials (o el error del backend si lo trae)
    if (!upstreamRes.ok) {
      let msg = "Invalid credentials";
      try {
        const text = await upstreamRes.text();
        const j = text ? JSON.parse(text) : null;
        if (j?.detail) msg = String(j.detail);
        else if (j?.error) msg = String(j.error);
      } catch {
        // ignore
      }

      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // Si es 200, para el MVP ya está: login OK
    const redirect_to =
      username.toLowerCase() === "admin" ? "/dash/admin" : "/dash/staff";

    return NextResponse.json({
      ok: true,
      redirect_to,
      user: { username },
    });
  } catch (err) {
    console.error("API login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}