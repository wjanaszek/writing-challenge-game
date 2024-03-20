"use client";

import { PubSubChannels } from "@/common/pub-sub";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

export default function WriteSentenceInput({
  onSubmit,
}: {
  onSubmit: (sentence: string) => Promise<void>;
}) {
  const [sentence, setSentence] = useState<string>("");
  const { channel } = useChannel(PubSubChannels.SENTENCES, ({ data }) => {
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

    await onSubmit(sentence);
    // TODO add some snackbar that user has logged in
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
