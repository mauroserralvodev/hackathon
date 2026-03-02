// components/auth/LoginPanel.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

const BRAND = "#FF8282";

function normalizePhone(input: string) {
  return input.replace(/[^\d+]/g, "").trim();
}

export default function LoginPanel() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneClean = useMemo(() => normalizePhone(phone), [phone]);
  const canSubmit = phoneClean.length >= 6 && !loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const p = normalizePhone(phone);
    if (!p) {
      setError("Enter your phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: p }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Login failed.");
        return;
      }

      // Demo MVP: guardar datos mínimos
      localStorage.setItem("stageflow_user", JSON.stringify(data.user));

      router.push(data.redirect_to || "/dash");
    } catch (err) {
      console.error(err);
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="absolute bottom-10 left-10">
        <Image
          src="/stageflow-banner.png"
          alt="Stage Flow logo"
          width={180}
          height={40}
        />
      </div>
      <div className="mb-10">
        <Image
          src="/stageflow.png"
          alt="Stage Flow logo"
          width={160}
          height={40}
          priority
        />
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-7">
        <h1 className="text-lg text-neutral-800 tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-neutral-800">
          Use your staff phone number.
        </p>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-neutral-400">
              Phone number
            </label>
            <input
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone number (e.g. 600 000 000)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm text-neutral-400">
              Verification code
            </label>
            <input
              inputMode="text"
              placeholder="Verification Code (e.g. xX-6as7...kM4)"
              className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-400 flex items-center justify-start">
              <CircleX size={15} /><span className="pl-2">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="h-11 w-full rounded-xl text-sm text-white transition active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100"
            style={{ backgroundColor: BRAND }}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}