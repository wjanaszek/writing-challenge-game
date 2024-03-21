"use client";
import { PubSubChannels } from "@/common/pub-sub";
import { ActiveSentenceMessage } from "@/common/types";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

export default function DisplayActiveSentence() {
  const [activeSentence, setActiveSentence] = useState<string>("");
  const { channel } = useChannel(
    PubSubChannels.SENTENCES,
    ({ data }: { data: ActiveSentenceMessage }) => {
      setActiveSentence(data.activeSentence);
    },
  );

  useEffect(() => {
    return () => channel.unsubscribe();
  }, []);

  return (
    <div>
      <h2>Write this: &quot;{activeSentence}&quot;</h2>
    </div>
  );
}
