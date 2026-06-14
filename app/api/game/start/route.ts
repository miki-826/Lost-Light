import { NextResponse } from "next/server";
import { OPENING_MESSAGE } from "@/lib/mock/answers";
import { HAS_OPENAI } from "@/lib/openai";
import type { StartResult } from "@/lib/types";

export async function POST() {
  const result: StartResult = {
    sessionId: `local-${Date.now()}`,
    aiName: "LUX",
    openingMessage: OPENING_MESSAGE,
    questionLimit: 5,
    lightGauge: 0,
  };
  return NextResponse.json({ ...result, mockMode: !HAS_OPENAI });
}
