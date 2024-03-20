import { sql } from "@vercel/postgres";

export async function initStorageSchema(): Promise<void> {
  await sql`CREATE TABLE IF NOT EXISTS sentences (
     id int PRIMARY KEY,
     sentence text NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS players (
     id uuid PRIMARY KEY,
     login text NOT NULL,
     words_per_minute integer NOT NULL default 0,
     accuracy integer NOT NULL default 0
  )`;
}
