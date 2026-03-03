"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { SAMPLE_MAP_DATA } from "@/lib/sampleMapData";
import type { MapDataResponse, MapMarker, MapZone } from "@/types/map";

const DEFAULT_SOCKET_URL = "ws://a220-95-215-123-97.ngrok-free.app/ws/markers";

type ConnectionStatus = "idle" | "connecting" | "open" | "closed" | "error";

interface MarkersContextValue {
  data: MapDataResponse;
  status: ConnectionStatus;
  error?: string;
  lastUpdated?: number;
  reconnect: () => void;
}

const MarkersContext = createContext<MarkersContextValue | undefined>(undefined);

function isMapMarker(value: unknown): value is MapMarker {
  if (!value || typeof value !== "object") return false;
  const marker = value as Partial<MapMarker>;
  return typeof marker.lat === "number" && typeof marker.lng === "number";
}

function isMapZone(value: unknown): value is MapZone {
  if (!value || typeof value !== "object") return false;
  const zone = value as Partial<MapZone>;
  const coordinatesValid = Array.isArray(zone.coordinates)
    ? zone.coordinates.every(
        (point) =>
          Array.isArray(point) &&
          point.length === 2 &&
          typeof point[0] === "number" &&
          typeof point[1] === "number"
      )
    : false;
  return typeof zone.id === "string" && coordinatesValid;
}

type MapDataUpdate = Partial<MapDataResponse>;

function hasMapDataFields(update: MapDataUpdate) {
  return (
    Object.prototype.hasOwnProperty.call(update, "markers") ||
    Object.prototype.hasOwnProperty.call(update, "zones") ||
    Object.prototype.hasOwnProperty.call(update, "center") ||
    Object.prototype.hasOwnProperty.call(update, "zoom")
  );
}

function isMapDataUpdate(payload: unknown): payload is MapDataUpdate {
  if (!payload || typeof payload !== "object") return false;
  const data = payload as MapDataUpdate;
  const markersValid =
    data.markers === undefined || (Array.isArray(data.markers) && data.markers.every(isMapMarker));
  const zonesValid = data.zones === undefined || (Array.isArray(data.zones) && data.zones.every(isMapZone));
  const centerValid =
    data.center === undefined ||
    (Array.isArray(data.center) &&
      data.center.length === 2 &&
      typeof data.center[0] === "number" &&
      typeof data.center[1] === "number");
  const zoomValid = data.zoom === undefined || typeof data.zoom === "number";
  return markersValid && zonesValid && centerValid && zoomValid;
}

export function MarkersProvider({ children, fallbackData = SAMPLE_MAP_DATA }: PropsWithChildren<{ fallbackData?: MapDataResponse }>) {
  const [data, setData] = useState<MapDataResponse>(fallbackData);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [error, setError] = useState<string | undefined>();
  const [lastUpdated, setLastUpdated] = useState<number | undefined>();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const resolveSocketUrl = useCallback(() => {
    const configuredUrl = process.env.NEXT_PUBLIC_MARKERS_SOCKET_URL ?? DEFAULT_SOCKET_URL;
    if (typeof window !== "undefined" && window.location.protocol === "https:" && configuredUrl.startsWith("ws://")) {
      return configuredUrl.replace("ws://", "wss://");
    }
    return configuredUrl;
  }, []);

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const cleanupSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onerror = null;
      wsRef.current.onmessage = null;
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    clearReconnectTimer();

    if (wsRef.current) {
      const { readyState } = wsRef.current;
      if (readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING) {
        return;
      }
      cleanupSocket();
    }

    setStatus("connecting");
    setError(undefined);

    try {
      console.log("Im about to new WebSocket")
      const socketUrl = resolveSocketUrl();
      wsRef.current = new WebSocket(socketUrl);
    } catch (connectionError) {
      setStatus("error");
      setError(connectionError instanceof Error ? connectionError.message : "Unable to create WebSocket connection");
      return;
    }

    const socket = wsRef.current;

    socket.onopen = () => {
      reconnectAttemptsRef.current = 0;
      setStatus("open");
    };

    socket.onerror = (error) => {
      console.error(error)
      setStatus("error");
      setError("WebSocket encountered an error");
      socket.close();
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data);
          setData(payload);
          setLastUpdated(Date.now());
          setStatus("open");
          setError(undefined);
      } catch (parseError) {
        setError(parseError instanceof Error ? parseError.message : "Unable to parse websocket payload");
      }
    };

    socket.onclose = () => {
      setStatus("closed");
      const attempts = reconnectAttemptsRef.current + 1;
      reconnectAttemptsRef.current = attempts;
      const retryDelay = Math.min(1000 * 2 ** (attempts - 1), 10000);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, retryDelay);
    };
  }, [cleanupSocket, clearReconnectTimer, resolveSocketUrl]);

  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimer();
      cleanupSocket();
    };
  }, [connect, clearReconnectTimer, cleanupSocket]);

  const value = useMemo<MarkersContextValue>(
    () => ({
      data,
      status,
      error,
      lastUpdated,
      reconnect,
    }),
    [data, status, error, lastUpdated, reconnect]
  );

  return <MarkersContext.Provider value={value}>{children}</MarkersContext.Provider>;
}

export function useMarkersData() {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error("useMarkersData must be used within a MarkersProvider");
  }
  return context;
}
