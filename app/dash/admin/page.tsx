// app/dash/admin/page.tsx
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white text-neutral-800">
        <div className="text-xl tracking-tight">Admin</div>
        <div className="mt-2 text-sm text-neutral-600">
          Pre-event setup: staff registry, groups, zones, and priority rules.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Staff registry" desc="Manage staff phone numbers and roles." />
        <Card title="Zones" desc="Define map areas and policies." />
      </div>
    </div>
  );
}