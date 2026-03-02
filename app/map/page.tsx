import MapWrapper from "@/components/map/MapWrapper";
import type { MapZone } from "@/types/map";
import { GET } from "@/app/api/map-data/route";

const SAMPLE_MARKERS = [
  { lat: 41.3851, lng: 2.1734, label: "Main Stage" },
  { lat: 41.3865, lng: 2.1750, label: "Second Stage" },
  { lat: 41.3840, lng: 2.1720, label: "Food & Drinks" },
  { lat: 41.3858, lng: 2.1710, label: "Info Point" },
];

const SAMPLE_ZONES: MapZone[] = [
  {
    id: "arena",
    name: "Main Arena",
    role: "stage",
    coordinates: [
      [41.3859, 2.1728],
      [41.3854, 2.1742],
      [41.3844, 2.1734],
      [41.3848, 2.1719],
    ],
    fillOpacity: 0.25,
  },
  {
    id: "food-court",
    name: "Food Court",
    role: "food",
    coordinates: [
      [41.3866, 2.1720],
      [41.3861, 2.1729],
      [41.3852, 2.1721],
      [41.3857, 2.1713],
    ],
    fillOpacity: 0.25,
  },
];

export default async function MapPage() {
  const mapDataResponse = await GET();
  const mapData = await mapDataResponse.json();
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold text-neutral-900 mb-4">Venue Map</h1>
      <MapWrapper
        markers={mapData.markers}
        zones={mapData.zones}
        center={mapData.center}
        zoom={mapData.zoom}
        className="h-[600px] w-full rounded-xl overflow-hidden shadow"
      />
    </main>
  );
}
