// components/dash/DashShell.tsx
"use client";

import { useEffect, useState } from "react";
import SidebarNav from "@/components/dash/SidebarNav";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function DashShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="max-h-screen bg-white">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-9999 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="/stageflow.png"
            alt="Stage Flow logo"
            width={160}
            height={40}
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-neutral-800 hover:bg-neutral-50"
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile drawer (keep mounted for smooth animation) */}
      <div
        className={[
          "fixed inset-0 lg:hidden z-9999",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 bg-black/30 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={[
            "absolute left-0 top-0 h-full w-full bg-white",
            "border-r border-neutral-200",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <Link href={"/"} className="cursor-pointer">
              <Image
                src="/stageflow.png"
                alt="Stage Flow logo"
                width={160}
                height={40}
                priority
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-neutral-800 hover:bg-neutral-50"
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <div className="p-6">
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>

      {/* Desktop shell */}
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr] py-3">
        <aside className="hidden border-r border-y border-black/10 rounded-r-2xl lg:block">
          <div className="p-4 h-[calc(100vh-1.5rem)] flex flex-col">
            {/* top */}
            <div>
              <div className="flex w-full items-center justify-center pt-4 pb-5">
                <Link href={"/"} className="cursor-pointer">
                  <Image
                    src="/stageflow.png"
                    alt="Stage Flow logo"
                    width={160}
                    height={40}
                    priority
                  />
                </Link>
              </div>

              <div className="mt-4">
                <SidebarNav />
              </div>
            </div>

            {/* bottom (StageFlow copy) */}
            <div className="mt-auto pt-6 pb-1">
              <div className="border-t border-black/10 pt-6">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs px-1">
                  <Link
                    href="/privacy"
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/support"
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    Support
                  </Link>

                  {/* opcional */}
                  <span className="text-neutral-400">v1.0</span>
                </div>
                <p className="text-xs text-neutral-400 mt-4 px-1">
                  © {year} StageFlow
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}