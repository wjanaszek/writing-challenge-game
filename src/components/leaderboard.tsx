import { PlayerStats } from "@/common/types";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

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
    <ul className={'py-4'}>
      {playerStats.map((stats) => (
        <li key={stats.id}>
          Name: {stats.name}, Words per minute: {stats.wordsPerMinute},
          Accuracy: {stats.accuracy}
        </li>
      ))}
    </ul>
  );
}
