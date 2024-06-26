"use client";

import { ACTIVE_PLAYER_STORAGE_KEY } from "@/common/constants";
import { ActivePlayer } from "@/common/types";
import { useEffect, useState } from "react";

export default function Player({
  onJoinGame,
}: {
  onJoinGame: (playerName: string) => Promise<ActivePlayer>;
}) {
  const [name, setName] = useState("");
  const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    const activePlayerData = await onJoinGame(name.trim());
    sessionStorage.setItem(
      ACTIVE_PLAYER_STORAGE_KEY,
      JSON.stringify(activePlayerData),
    );
    setActivePlayer(activePlayerData);
    setName("");
    // TODO add some snackbar that user has logged in
  };

  const handleLogOut = (): void => {
    sessionStorage.removeItem(ACTIVE_PLAYER_STORAGE_KEY);
    setActivePlayer(null);
    setName("");
  };

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

  return (
    <>
      {!!activePlayer ? (
        <>
          <span>Playing as: {activePlayer.name}</span>
          <button className={"px-4"} type="button" onClick={handleLogOut}>
            Log out
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <button type="submit">Join game</button>
        </form>
      )}
    </>
  );
}
