import { PubSubChannels } from "@/common/pub-sub";
import { PlayerStats, PlayerStatsUpdateChunkMessage } from "@/common/types";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  // used to listen of update stats
  const { channel } = useChannel(
    PubSubChannels.PLAYERS,
    ({ data }: { data: PlayerStatsUpdateChunkMessage }) => {
      console.log("got data", data);
      if (!playerStats.some((player) => player.id === data.id)) {
        setPlayerStats([...playerStats, data]);
      }

      setPlayerStats(
        playerStats.map((player) => {
          if (player.id !== data.id) {
            return player;
          }

          return {
            id: player.id,
            name: player.name,
            wordsPerMinute: data.wordsPerMinute,
            accuracy: data.accuracy,
          };
        }),
      );
    },
  );

  useEffect(() => {
    return () => channel.unsubscribe();
  }, []);

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async (): Promise<void> => {
    const response = await fetch("/api/player", {
      method: "GET",
      cache: "no-store",
    });

    const playerStats = await response.json();
    setPlayerStats(playerStats);
  };

  return (
    <>
      <h3>Leaderboard</h3>
      <ul className={"pb-4"}>
        {playerStats.map((stats) => (
          <li key={stats.id} className={"py-2"}>
            Name: {stats.name}, <br></br>
            Words per minute: {stats.wordsPerMinute}, <br></br>
            Accuracy: {stats.accuracy}
          </li>
        ))}
      </ul>
    </>
  );
}
