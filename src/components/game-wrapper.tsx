"use client";

import GameLogic from "@/components/game-logic";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";

export default function GameWrapper({ sentences }: { sentences: string[] }) {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/ably" });

  return (
    <AblyProvider client={client}>
      <GameLogic sentences={sentences} />
    </AblyProvider>
  );
}
