"use client";

import { joinGame } from "@/app/actions/join-game";
import { submitSentence } from "@/app/actions/submit-sentence";
import ActiveSentenceLogic from "@/components/active-sentence-logic";
import Player from "@/components/player";
import WriteSentenceInput from "@/components/write-sentence-input";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";

export default function GameWrapper({ sentences }: { sentences: string[] }) {
  const client = new Ably.Realtime.Promise({ authUrl: "/api/ably" });

  return (
    <AblyProvider client={client}>
      <ActiveSentenceLogic sentences={sentences} />
      <WriteSentenceInput onSubmit={submitSentence} />
      <Player onJoinGame={joinGame} />
    </AblyProvider>
  );
}
