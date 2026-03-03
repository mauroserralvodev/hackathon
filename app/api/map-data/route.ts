import { NextResponse } from "next/server";
import { SAMPLE_MAP_DATA } from "@/lib/sampleMapData";

export async function GET(): Promise<Response> {
  return NextResponse.json(SAMPLE_MAP_DATA);
}
