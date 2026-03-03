import LiveMapSection from "@/components/map/LiveMapSection";

export default function MapPage() {
  return (
    <main className="bg-white rounded-2xl border border-black/10 p-6">
      <p className="text-lg tracking-tight text-neutral-900 mb-4">Venue Map</p>
      <LiveMapSection />
    </main>
  );
}
