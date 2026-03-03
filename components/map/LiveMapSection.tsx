"use client";

import { useMemo, useRef } from "react";
import MapWrapper from "./MapWrapper";
import { MarkersProvider, useMarkersData } from "./MarkersProvider";
import { SAMPLE_MAP_DATA } from "@/lib/sampleMapData";

const STATUS_COPY: Record<ReturnType<typeof getStatusKey>, { label: string; pillClass: string }> = {
  idle: { label: "Idle", pillClass: "bg-neutral-100 text-neutral-600" },
  connecting: { label: "Connecting", pillClass: "bg-amber-100 text-amber-800" },
  open: { label: "Live", pillClass: "bg-emerald-100 text-emerald-800" },
  closed: { label: "Disconnected", pillClass: "bg-neutral-100 text-neutral-600" },
  error: { label: "Error", pillClass: "bg-rose-100 text-rose-800" },
};

function getStatusKey(status?: string) {
  if (status === "connecting" || status === "open" || status === "closed" || status === "error") {
    return status;
  }
  return "idle";
}

let messageFrames = 0;

const SIMULATED_MARKER_PATH = [
  { lat: 41.37305, lng: 2.15077 },
  { lat: 41.37509, lng: 2.15117 },
  { lat: 41.37437, lng: 2.14822 },
  { lat: 41.37397, lng: 2.14874 },
];

function LiveMapContent() {
  const { data, status, error, lastUpdated, reconnect } = useMarkersData();
  const lastComplete = useRef(SAMPLE_MAP_DATA);
  // console.log("message frames", messageFrames);
  const mergedData = useMemo(() => {
    messageFrames++;
    if (!data) return lastComplete.current;
    lastComplete.current = { ...lastComplete.current, ...data };
    // updateFakeMarker(data.markers, messageFrames);
    return lastComplete.current;
  }, [data]);
  const statusKey = getStatusKey(status);
  const statusMeta = STATUS_COPY[statusKey];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusMeta.pillClass}`}>
            {statusMeta.label}
          </span>
          {lastUpdated && <span className="text-xs text-neutral-500">Updated {new Date(lastUpdated).toLocaleTimeString()}</span>}
        </div>
        {(statusKey === "error" || statusKey === "closed") && (
          <button
            type="button"
            onClick={reconnect}
            className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Retry connection
          </button>
        )}
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <MapWrapper
        markers={mergedData.markers}
        zones={mergedData.zones}
        center={mergedData.center}
        zoom={mergedData.zoom}
        className="h-150 w-full rounded-xl overflow-hidden shadow"
      />
    </div>
  );
}

let index = 0;
function updateFakeMarker(markers: MapMarker[], frame: number) {
  let targetIndex
  let target
  if (frame>6&&(!markers?.length || frame % 3)) {
    targetIndex = Math.min(index++, SIMULATED_MARKER_PATH.length - 1);
    target = SIMULATED_MARKER_PATH[targetIndex];
    markers[0].lat = target.lat;
    markers[0].lng = target.lng;
  }



  markers[0].label = `Evgeny ${targetIndex}`;
  markers[0].role = "support";
}

export default function LiveMapSection() {
  return (
    <MarkersProvider fallbackData={SAMPLE_MAP_DATA}>
      <LiveMapContent />
    </MarkersProvider>
  );
}
