"use client";

import { useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import type { MapMarker, MapMarkerRole, MapZone } from "@/types/map";
import ClickCoordinateMarker from "./ClickCoordinateMarker";

interface MapComponentProps {
  markers: MapMarker[];
  zones?: MapZone[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const ROLE_COLORS: Record<string, string> = {
  stage: "#ef4444",
  food: "#f59e0b",
  info: "#3b82f6",
  support: "#8b5cf6",
  entry: "#22c55e",
};

function getRoleColor(role?: MapMarkerRole) {
  if (!role) return ROLE_COLORS.default ?? "#2563eb";
  return ROLE_COLORS[role] ?? ROLE_COLORS.default ?? "#2563eb";
}

function createMarkerIcon(color: string, label?: string) {
  return L.divIcon({
    className: "role-marker",
    html: `
      <span
        style="
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:26px;
          height:26px;
          border-radius:9999px;
          border:2px solid #fff;
          box-shadow:0 3px 6px rgba(0,0,0,0.25);
          background:${color};
          color:#fff;
          font-size:12px;
          font-weight:600;
        "
      >${label ? label.charAt(0).toUpperCase() : ""}</span>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -24],
  });
}

export default function MapComponent({
  markers=[],
  zones = [],
  center,
  zoom = 5,
  className = "h-125 w-full",
}: MapComponentProps) {
  const iconCacheRef = useRef<Record<string, L.DivIcon>>({});
  const coordinateHelperIcon = useMemo(() => createMarkerIcon("#0f172a", "✦"), []);

  const mapCenter: [number, number] = useMemo(() => {
    if (center) return center;
    if (markers.length > 0) return [markers[0].lat, markers[0].lng];
    if (zones.length > 0) return zones[0].coordinates[0];
    return [0, 0];
  }, [center, markers, zones]);

  const getMarkerIcon = (marker: MapMarker) => {
    const key = marker.role ?? "default";
    if (!iconCacheRef.current[key]) {
      iconCacheRef.current[key] = createMarkerIcon(getRoleColor(marker.role), marker.label);
    }
    return iconCacheRef.current[key];
  };
  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom
      className={className}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zones.map((zone) => {
        const color = zone.color ?? getRoleColor(zone.role);
        return (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: zone.fillOpacity ?? 0.2,
              weight: 2,
            }}
          >
            {zone.name && <Popup>{zone.name}</Popup>}
          </Polygon>
        );
      })}
      {markers.map((marker, index) => (
        <Marker key={`${marker.lat}-${marker.lng}-${index}`} position={[marker.lat, marker.lng]} icon={getMarkerIcon(marker)}>
          {marker.label && <Popup>{marker.label}</Popup>}
        </Marker>
      ))}
      <ClickCoordinateMarker icon={coordinateHelperIcon} />
    </MapContainer>
  );
}
