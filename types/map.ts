export type MapMarkerRole =
  | "stage"
  | "food"
  | "info"
  | "support"
  | "entry"
  | (string & {});

export interface MapMarker {
  lat: number;
  lng: number;
  label?: string;
  role?: MapMarkerRole;
}

export interface MapZone {
  id: string;
  name?: string;
  coordinates: [number, number][];
  color?: string;
  fillOpacity?: number;
  role?: MapMarkerRole;
}

export interface MapDataResponse {
  markers: MapMarker[];
  zones: MapZone[];
  center?: [number, number];
  zoom?: number;
}
