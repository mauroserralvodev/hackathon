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

function LiveMapContent() {
  const { data, status, error, lastUpdated, reconnect } = useMarkersData();
  const lastComplete = useRef(SAMPLE_MAP_DATA);
  const mergedData = useMemo(() => {
    if (!data) return lastComplete.current;
    lastComplete.current = { ...lastComplete.current, ...data };
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
        className="h-[600px] w-full rounded-xl overflow-hidden shadow"
      />
    </div>
  );
}

export default function LiveMapSection() {
  return (
    <MarkersProvider fallbackData={SAMPLE_MAP_DATA}>
      <LiveMapContent />
    </MarkersProvider>
  );
}
