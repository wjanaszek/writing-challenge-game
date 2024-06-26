"use client";

import { ACTIVE_PLAYER_STORAGE_KEY } from "@/common/constants";
import { ActivePlayer, PlayerStats } from "@/common/types";
import ActiveSentenceLogic from "@/components/active-sentence-logic";
import Leaderboard from "@/components/leaderboard";
import Player from "@/components/player";
import Timer from "@/components/timer";
import WriteSentenceInput from "@/components/write-sentence-input";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useState } from "react";

export default function GameWrapper({ sentences }: { sentences: string[] }) {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/ably" });

  // TODO improve that (should not be duplicated so many times - move to hook or sth)
  const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);

  useEffect(() => {
    const rawActivePlayerDataRaw = sessionStorage.getItem(
      ACTIVE_PLAYER_STORAGE_KEY,
    );

    if (!rawActivePlayerDataRaw) {
      return;
    }

    const activePlayerData = JSON.parse(rawActivePlayerDataRaw);

    if (!activePlayerData.id || !activePlayerData.name) {
      return;
    }

    setActivePlayer(activePlayerData);
  }, []);

  const joinGame = async (playerName: string): Promise<ActivePlayer> => {
    const response = await fetch("/api/player", {
      method: "POST",
      body: JSON.stringify({ playerName }),
      cache: "no-store",
    });

    const activePlayerData = await response.json();

    setActivePlayer(activePlayerData);

    return activePlayerData;
  };

  return (
    <AblyProvider client={client}>
      <ActiveSentenceLogic sentences={sentences} />
      {activePlayer && <WriteSentenceInput />}
      <Player onJoinGame={joinGame} />
      <Leaderboard />
      <Timer />
    </AblyProvider>
  );
}
