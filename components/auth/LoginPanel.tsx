"use client";

import { useState } from "react";
import Image from "next/image";

const BRAND = "#FF8282";

export default function LoginPanel() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      
      {/* Logo */}
      <div className="absolute top-10 left-10">
        <Image
          src="/stageflow.png"
          alt="Stage Flow logo"
          width={160}
          height={40}
        />
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-neutral-200 p-7">
        
        <h1 className="text-xl text-neutral-800 tracking-tight">
          Sign in
        </h1>

        <p className="mt-2 text-sm text-neutral-800">
          Access your staff dashboard
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm text-neutral-800">
              Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="mt-1 h-11 w-full rounded-md border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-800">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 w-full rounded-md border border-neutral-200 px-3 pr-12 text-sm text-neutral-800 outline-none focus:border-neutral-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 h-11 w-full rounded-xl text-sm text-white transition active:scale-[0.99]"
            style={{ backgroundColor: BRAND }}
          >
            Continue
          </button>
        </form>

      </div>
    </div>
  );
}