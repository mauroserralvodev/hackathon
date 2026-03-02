import MapWrapper from "@/components/map/MapWrapper";

const SAMPLE_MARKERS = [
  { lat: 41.3851, lng: 2.1734, label: "Main Stage" },
  { lat: 41.3865, lng: 2.1750, label: "Second Stage" },
  { lat: 41.3840, lng: 2.1720, label: "Food & Drinks" },
  { lat: 41.3858, lng: 2.1710, label: "Info Point" },
];

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-4">Venue Map</h1>
      <MapWrapper
        markers={SAMPLE_MARKERS}
        center={[41.3851, 2.1734]}
        zoom={15}
        className="h-[600px] w-full rounded-xl overflow-hidden shadow"
      />
    </main>
  );
}
