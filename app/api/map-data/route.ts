import { NextResponse } from "next/server";
import type { MapDataResponse } from "@/types/map";
import { SAMPLE_MAP_DATA } from "@/lib/sampleMapData";

export async function GET(): Promise<Response> {
  return NextResponse.json(SAMPLE_MAP_DATA);
}
