"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
}

interface MapComponentProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({
  markers,
  center,
  zoom = 13,
  className = "h-[500px] w-full",
}: MapComponentProps) {
  useEffect(() => {
    L.Marker.prototype.options.icon = customIcon;
  }, []);

  const mapCenter: [number, number] =
    center ?? (markers.length > 0 ? [markers[0].lat, markers[0].lng] : [0, 0]);

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
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
          {marker.label && <Popup>{marker.label}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
}
