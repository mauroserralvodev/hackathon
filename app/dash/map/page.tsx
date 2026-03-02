import MapWrapper from "@/components/map/MapWrapper";
import type { MapZone } from "@/types/map";
import { GET } from "@/app/api/map-data/route";

export default async function MapPage() {
  const mapDataResponse = await GET();
  const mapData = await mapDataResponse.json();
  return (
    <main className="p-4 sm:p-6 border border-black/10 bg-white rounded-2xl">
      <p className="text-lg tracking-tight text-neutral-900 mb-4">Venue Map</p>
      <MapWrapper
        markers={mapData.markers}
        zones={mapData.zones}
        center={mapData.center}
        zoom={mapData.zoom}
        className="h-150 w-full rounded-2xl sm:rounded-2xl overflow-hidden shadow"
      />
    </main>
  );
}
