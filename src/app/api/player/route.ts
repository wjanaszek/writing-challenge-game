import { joinGame } from "@/app/actions/join-game";
import { ActivePlayer } from "@/common/types";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<ActivePlayer>> {
  const jsonBody = await req.json();
  const joinedPlayer = await joinGame(jsonBody.playerName);

  return NextResponse.json(joinedPlayer, { status: 200 });
}
