"use client";

import { ACTIVE_PLAYER_STORAGE_KEY } from "@/common/constants";
import { PubSubChannels } from "@/common/pub-sub";
import { PlayerStats, PlayerStatsUpdateChunkMessage } from "@/common/types";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

export default function WriteSentenceInput() {
  const [activeSentence, setActiveSentence] = useState<string>("");
  const [sentence, setSentence] = useState<string>("");
  const { channel } = useChannel(PubSubChannels.SENTENCES, ({ data }) => {
    setActiveSentence(data.activeSentence);
    setSentence("");
  });

  useEffect(() => {
    return () => channel.unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO move that to hook
    const rawActivePlayerDataRaw = sessionStorage.getItem(
      ACTIVE_PLAYER_STORAGE_KEY,
    );

    if (!rawActivePlayerDataRaw) {
      return;
    }

    const activePlayerData = JSON.parse(rawActivePlayerDataRaw);

    // TODO proper counting
    const wordsPerMinute = 23;
    const accuracy = 16;

    await Promise.all([
      submitSentence(activePlayerData.id, wordsPerMinute, accuracy),
      channel.publish(PubSubChannels.PLAYERS, {
        id: activePlayerData.id,
        name: activePlayerData.name,
        wordsPerMinute,
        accuracy,
      } satisfies PlayerStatsUpdateChunkMessage),
    ]);
  };

  const submitSentence = async (
    playerId: string,
    wordsPerMinute: number,
    accuracy: number,
  ): Promise<PlayerStats> => {
    const response = await fetch("/api/sentence", {
      method: "POST",
      body: JSON.stringify({ playerId, wordsPerMinute, accuracy }),
      cache: "no-store",
    });

    return response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={sentence}
        onChange={handleChange}
        placeholder="Write the sentence"
        className={"mr-4"}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
