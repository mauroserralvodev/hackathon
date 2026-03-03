import type { MapDataResponse } from "@/types/map";

export const SAMPLE_MAP_DATA: MapDataResponse = {
  center: [41.373028, 2.149671],
  zoom: 18,
  markers: [
    { lat: 41.37372, lng: 2.14881, label: "Evgeny", role: "support" },
    { lat: 41.37306, lng: 2.14941, label: "Staff 2", role: "stage" },
    { lat: 41.37207, lng: 2.15009, label: "Staff 3", role: "stage" },
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
        [41.37331, 2.14871],
        [41.37359, 2.14955],
        [41.37390, 2.14934],
        [41.37393, 2.14872],
        [41.37409, 2.14831],
        [41.37354, 2.14758],
        [41.37341, 2.14772],
        [41.37365, 2.14852],
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
    {
      id: "zone-2",
      name: "Zone 2",
      coordinates: [
        [41.3733111111, 2.1488361111],
        [41.3735805556, 2.1495888889],
        [41.3728111111, 2.1500694444],
        [41.3725277778, 2.1492555556],
      ],
      color: "#06b6d4", // cian
      fillOpacity: 0.22,
    },
    {
      id: "zone-3",
      name: "Zone 3",
      coordinates: [
        [41.37250, 2.14934],
        [41.37275, 2.15009],
        [41.37177, 2.15079], 
        [41.37154, 2.15005],
      ],
      color: "#a78bfa", // violeta
      fillOpacity: 0.22,
    },
  ],
};