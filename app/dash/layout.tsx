// app/dash/layout.tsx
import DashShell from "@/components/dash/DashShell";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <DashShell>{children}</DashShell>;
}