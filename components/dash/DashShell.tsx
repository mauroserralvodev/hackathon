// components/dash/DashShell.tsx
"use client";

import { useState } from "react";
import SidebarNav from "@/components/dash/SidebarNav";
import Image from "next/image";

const BRAND = "#FF8282";

export default function DashShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-800"
          aria-label="Open menu"
        >
          Menu
        </button>

        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-xs bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <div className="text-sm text-neutral-800">Stage Flow</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-800"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <div className="p-3">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop shell */}
      <div className="mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-neutral-200 lg:block">
          <div className="p-4">
            <div className="w-full flex items-center justify-center py-5">
              <Image
                src="/stageflow.png"
                alt="Stage Flow logo"
                width={160}
                height={40}
              />
            </div>
            <div className="mt-4">
              <SidebarNav />
            </div>
          </div>
        </aside>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}