// components/dash/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BRAND = "#FF8282";

type Props = {
  onNavigate?: () => void;
};

export default function SidebarNav({ onNavigate }: Props) {
  const pathname = usePathname();

  const items = [
    { href: "/dash/staff", label: "Staff" },
    { href: "/dash/admin", label: "Admin" },
  ];

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              "block rounded-xl border px-3 py-2 text-sm text-neutral-800 transition",
              active
                ? "border-black/10 bg-neutral-100"
                : "border-black/10 hover:bg-neutral-50",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}