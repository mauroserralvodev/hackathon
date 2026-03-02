// app/dash/layout.tsx
import DashShell from "@/components/dash/DashShell";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen">
      <DashShell>
        {children}
      </DashShell>
    </div>
  );
}