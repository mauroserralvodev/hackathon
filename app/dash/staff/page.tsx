// app/dash/staff/page.tsx
import { Card } from "@/components/ui/card";

export default function StaffPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white text-neutral-800">
        <div className="text-xl tracking-tight">Staff</div>
        <div className="mt-2 text-sm text-neutral-600">
          Tools for on-event operations: alerts, assignments, quick actions.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Notifications" desc="Event alerts and updates." />
        <Card title="Quick actions" desc="Fast access to common tasks." />
      </div>
    </div>
  );
}
// FORM
// 