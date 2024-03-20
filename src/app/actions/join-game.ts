import { ActivePlayer } from "@/common/types";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export async function joinGame(playerName: string): Promise<ActivePlayer> {
  const [existingPlayer] = (
    await sql`SELECT id, login FROM players WHERE login = ${playerName}`
  ).rows;

  if (existingPlayer) {
    return { id: existingPlayer.id, name: existingPlayer.login };
  }

  // TODO add some error handling
  const playerData = { id: randomUUID(), name: playerName };
  await sql`INSERT INTO players (id, login) VALUES (${playerData.id}, ${playerData.name})`;

  return playerData;
}
