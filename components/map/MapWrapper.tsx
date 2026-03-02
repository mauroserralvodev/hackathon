"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "./MapComponent";

interface MapWrapperProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-neutral-100 h-[500px] w-full rounded-lg">
      <span className="text-neutral-400 text-sm">Loading map…</span>
    </div>
  ),
});

export default function MapWrapper(props: MapWrapperProps) {
  return <MapComponent {...props} />;
}
