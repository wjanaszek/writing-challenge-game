"use client";

import { ACTIVE_PLAYER_STORAGE_KEY } from "@/common/constants";
import { PubSubChannels } from "@/common/pub-sub";
import { PlayerStats } from "@/common/types";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

export default function WriteSentenceInput({
  onSubmit,
}: {
  onSubmit: (
    userId: string,
    wordsPerMinute: number,
    accuracy: number,
  ) => Promise<PlayerStats>;
}) {
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
    const accuracy = 0.7;

    const playerStats = await onSubmit(
      activePlayerData.id,
      wordsPerMinute,
      accuracy,
    );
    await channel.publish(PubSubChannels.PLAYERS, playerStats);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={sentence}
        onChange={handleChange}
        placeholder="Write the sentence"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
