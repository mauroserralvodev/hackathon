import MapWrapper from "@/components/map/MapWrapper";
import type { MapZone } from "@/types/map";
import { GET } from "@/app/api/map-data/route";

export default async function MapPage() {
  const mapDataResponse = await GET();
  const mapData = await mapDataResponse.json();
  return (
    <main className="min-h-screen bg-white p-4 sm:p-6">
      <h1 className="text-2xl text-neutral-900 mb-4">Venue Map</h1>
      <MapWrapper
        markers={mapData.markers}
        zones={mapData.zones}
        center={mapData.center}
        zoom={mapData.zoom}
        className="h-150 w-full rounded-2xl sm:rounded-4xl overflow-hidden shadow"
      />
    </main>
  );
}
