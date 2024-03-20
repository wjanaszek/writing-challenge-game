import { PlayerStats } from "@/common/types";
import { sql } from "@vercel/postgres";

export async function getAllPlayerStats(): Promise<PlayerStats[]> {
  const { rows: playersIdsRows } = await sql`SELECT id, login FROM players`;

  return Promise.all(
    playersIdsRows.map(async (row) => {
      const { rows: playerStatsRows } =
        await sql`SELECT words_per_minute, accuracy FROM players_sentences WHERE player_id = ${row.id}`;

      const wordsPerMinuteSum = playerStatsRows.reduce(
        (prev, curr) => prev + curr.words_per_minute,
        0,
      );
      const accuracySum = playerStatsRows.reduce(
        (prev, curr) => prev + curr.accuracy,
        0,
      );

      return {
        id: row.id,
        name: row.login,
        wordsPerMinute: wordsPerMinuteSum / playerStatsRows.length,
        accuracy: accuracySum / playerStatsRows.length,
      };
    }),
  );
}
