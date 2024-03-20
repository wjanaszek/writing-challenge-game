"use client";

import { ROUND_DURATION_IN_MS } from "@/common/constants";
import { PubSubChannels, PubSubTopics } from "@/common/pub-sub";
import DisplayActiveSentence from "@/components/display-active-sentence";
import { useChannel } from "ably/react";
import { useEffect, useRef } from "react";

export default function ActiveSentenceLogic({ sentences }: { sentences: string[] }) {
  const { channel } = useChannel(
    PubSubChannels.SENTENCES,
    PubSubTopics.ACTIVE_SENTENCE,
  );
  const activeSentenceIndex = useRef<number>(0);

  useEffect(() => {
    channel.publish(PubSubChannels.SENTENCES, {
      activeSentence: resolveActiveSentence(),
    });

    const timer = setInterval(() => {
      channel.publish(PubSubChannels.SENTENCES, {
        activeSentence: resolveActiveSentence(),
      });
    }, ROUND_DURATION_IN_MS);

    return () => clearInterval(timer);
  }, []);

  const resolveActiveSentence = (): string => {
    if (activeSentenceIndex.current === sentences.length - 1) {
      activeSentenceIndex.current = 0;
    } else {
      activeSentenceIndex.current++;
    }

    return sentences[activeSentenceIndex.current];
  };

  useEffect(() => {
    return () => channel.unsubscribe();
  }, []);

  return <DisplayActiveSentence />;
}
