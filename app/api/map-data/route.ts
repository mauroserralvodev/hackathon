import { NextResponse } from "next/server";
import type { MapDataResponse } from "@/types/map";

const SAMPLE_MAP_DATA: MapDataResponse = {
  center: [41.3855, 2.1733],
  zoom: 15,
  markers: [
    { lat: 41.3851, lng: 2.1734, label: "Main Stage", role: "stage" },
    { lat: 41.3865, lng: 2.175, label: "Second Stage", role: "stage" },
    { lat: 41.384, lng: 2.172, label: "Food & Drinks", role: "food" },
    { lat: 41.3858, lng: 2.171, label: "Info Point", role: "info" },
    { lat: 41.385, lng: 2.169, label: "Backstage HQ", role: "support" },
    { lat: 41.3835, lng: 2.1705, label: "Main Entrance", role: "entry" },
  ],
  zones: [
    {
      id: "main-arena",
      name: "Main Arena",
      coordinates: [
        [41.3867, 2.1715],
        [41.3862, 2.176],
        [41.3848, 2.1754],
        [41.3848, 2.1712],
      ],
      role: "stage",
      fillOpacity: 0.2,
    },
    {
      id: "food-court",
      name: "Food Court",
      coordinates: [
        [41.3845, 2.1715],
        [41.3842, 2.1728],
        [41.3834, 2.1722],
        [41.3836, 2.1708],
      ],
      role: "food",
      fillOpacity: 0.25,
    },
    {
      id: "info-support",
      name: "Support & Info",
      coordinates: [
        [41.3857, 2.1702],
        [41.3854, 2.171],
        [41.3846, 2.1707],
        [41.3849, 2.1695],
      ],
      role: "info",
      fillOpacity: 0.25,
    },
  ],
};

export async function GET() {
  return NextResponse.json(SAMPLE_MAP_DATA);
}
