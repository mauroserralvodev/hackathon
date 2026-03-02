// app/dash/staff/page.tsx
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

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-800">
      <div className="text-sm tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-neutral-800">{desc}</div>
    </div>
  );
}