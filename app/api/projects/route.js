import { NextResponse } from "next/server";
import { projects } from "@/lib/projects-data";

export async function GET() {
  return NextResponse.json({ projects });
}
