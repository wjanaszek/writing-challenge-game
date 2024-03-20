import { PlayerStats } from "@/common/types";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export async function submitSentence(
  playerId: string,
  wordsPerMinute: number,
  accuracy: number,
): Promise<PlayerStats> {
  const { rows: playerDataRows } =
    await sql`SELECT * FROM players WHERE id = ${playerId}`;

  if (!playerDataRows.length) {
    // TODO error handling
    throw new Error(`Player not found`);
  }

  await sql`INSERT INTO players_sentences (id, player_id, words_per_minute, accuracy) VALUES (
    ${randomUUID()}, ${playerId}, ${wordsPerMinute}, ${accuracy} 
  )`;

  const { rows: playerStatsRows } =
    await sql`SELECT * FROM players_sentences WHERE player_id = ${playerId}`;

  const wordsPerMinuteSum = playerStatsRows.reduce(
    (prev, curr) => prev + curr.words_per_minute,
    0,
  );
  const accuracySum = playerStatsRows.reduce(
    (prev, curr) => prev + curr.accuracy,
    0,
  );

  return {
    id: playerId,
    name: playerDataRows[0].login,
    wordsPerMinute: playerStatsRows.length
      ? wordsPerMinuteSum / playerStatsRows.length
      : wordsPerMinute,
    accuracy: playerStatsRows.length
      ? accuracySum / playerStatsRows.length
      : accuracy,
  };
}
