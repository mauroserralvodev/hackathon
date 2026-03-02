export function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6 text-neutral-800">
      <div className="text-lg tracking-tight">{title}</div>
      <div className="mt-1 text-sm text-neutral-400">{desc}</div>
    </div>
  );
}