// app/dash/admin/page.tsx
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

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-800">
      <div className="text-sm tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-neutral-800">{desc}</div>
    </div>
  );
}