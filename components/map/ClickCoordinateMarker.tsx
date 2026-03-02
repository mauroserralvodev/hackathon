"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import type L from "leaflet";

interface ClickCoordinateMarkerProps {
  icon: L.DivIcon;
}

interface CoordinatePoint {
  id: number;
  lat: number;
  lng: number;
}

export default function ClickCoordinateMarker({ icon }: ClickCoordinateMarkerProps) {
  const [points, setPoints] = useState<CoordinatePoint[]>([]);
  const markerRefs = useRef<Record<number, L.Marker | null>>({});
  const idRef = useRef(0);
  const lastPointId = points[points.length - 1]?.id;

  useMapEvents({
    click(event) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      idRef.current += 1;
      setPoints((prev) => [...prev, { id: idRef.current, lat, lng }]);
    },
  });

  useEffect(() => {
    if (lastPointId) {
      markerRefs.current[lastPointId]?.openPopup();
    }
  }, [lastPointId]);

  if (points.length === 0) return null;

  return (
    <>
      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={icon}
          ref={(marker) => {
            markerRefs.current[point.id] = marker;
          }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-neutral-900">Dropped marker</p>
              <p className="text-xs font-mono text-neutral-700">
                {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
              </p>
              <p className="text-[11px] text-neutral-500">Keep clicking to add more reference points.</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
