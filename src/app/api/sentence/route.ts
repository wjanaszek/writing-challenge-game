import { submitSentence } from "@/app/actions/submit-sentence";
import { PlayerStats } from "@/common/types";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<PlayerStats>> {
  const jsonBody = await req.json();
  const actualPlayerStats = await submitSentence(
    jsonBody.playerId,
    jsonBody.wordsPerMinute,
    jsonBody.accuracy,
  );

  return NextResponse.json(actualPlayerStats, { status: 200 });
}
