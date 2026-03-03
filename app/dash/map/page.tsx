import LiveMapSection from "@/components/map/LiveMapSection";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-4">Venue Map</h1>
      <LiveMapSection />
    </main>
  );
}
