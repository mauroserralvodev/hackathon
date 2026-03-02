"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const BRAND = "#FF8282";

export default function LoginPanel() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      
      {/* Logo */}
      <div className="absolute top-10 left-10">
        <Image
          src="/stageflow-banner.png"
          alt="Stage Flow logo"
          width={220}
          height={40}
        />
      </div>

      {/* Card */}
      <div className="rounded-3xl p-7">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/stageflow.png"
            alt="Stage Flow logo"
            width={170}
            height={40}
          />
        </div>
        

        {/* <p className="text-sm text-neutral-500 mt-3">
          Access your staff dashboard
        </p> */}

        <form
          className="mt-12 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <input
              type="name"
              placeholder="Name"
              className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="mt-0.5 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div>
            <input
              type="phone"
              placeholder="Phone"
              className="mt-0.5 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm text-neutral-800 outline-none focus:border-neutral-300"
            />
          </div>

          <div>
            {/* Label + botón ? */}
            <div className="flex items-center justify-between">
              <label className="block text-xs text-black/40">
                Password
              </label>

              <div className="relative group ml-2">
                <button
                  type="button"
                  className="text-xs text-neutral-500 hover:text-black px-2.5 py-0.5 w-5 flex items-center justify-center rounded-full bg-neutral-100"
                  aria-label="Password help"
                >
                  ?
                </button>

                {/* Tooltip */}
                <div className="absolute z-10 right-0 mt-15 w-64 rounded-xl bg-neutral-50 border border-black/10 px-3 py-2 text-xs text-black opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
                  Enter the password that was provided to you in the email.
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-neutral-200 px-3 pr-12 text-sm text-neutral-800 outline-none focus:border-neutral-300"
              />

              {/* Botón ojo */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-neutral-500 hover:text-black cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-15 h-11 w-full rounded-xl text-sm text-white transition active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: BRAND }}
          >
            Continue
          </button>
        </form>

      </div>
    </div>
  );
}