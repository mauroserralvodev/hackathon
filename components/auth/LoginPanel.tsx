// components/auth/LoginPanel.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleX, Eye, EyeOff } from "lucide-react";

const BRAND = "#FF8282";

function clean(input: string) {
  return input.trim();
}

export default function LoginPanel() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // verification code = password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const u = useMemo(() => clean(username), [username]);
  const p = useMemo(() => clean(password), [password]);

  const [showPass, setShowPass] = useState(false);

  const canSubmit = u.length > 0 && p.length > 0 && !loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!u || !p) {
      setError("Enter your username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Login failed.");
        return;
      }

      localStorage.setItem("stageflow_user", JSON.stringify(data.user || { username: u }));
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
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <Image
          src="/stageflow-banner.png"
          alt="Stage Flow banner"
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
          Use your Stage Flow credentials.
        </p>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-neutral-400">Username</label>
            <input
              autoComplete="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div className="relative mb-8">
            <label className="block text-sm text-neutral-400">Password</label>

            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-neutral-200 px-3 pr-12 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />

            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute inset-y-0 right-0 mt-6 px-4 text-neutral-500 hover:text-black cursor-pointer flex items-center"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center justify-start rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-400">
              <CircleX size={15} />
              <span className="pl-2">{error}</span>
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