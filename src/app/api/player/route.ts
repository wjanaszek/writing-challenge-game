import { getAllPlayerStats } from "@/app/actions/get-all-player-stats";
import { joinGame } from "@/app/actions/join-game";
import { ActivePlayer, PlayerStats } from "@/common/types";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<ActivePlayer>> {
  const jsonBody = await req.json();
  const joinedPlayer = await joinGame(jsonBody.playerName);

  return NextResponse.json(joinedPlayer, { status: 200 });
}

export async function GET(): Promise<NextResponse<PlayerStats[]>> {
  const playerStats = await getAllPlayerStats();

  return NextResponse.json(playerStats, { status: 200 });
}
