import { sql } from "@vercel/postgres";

export async function initStorageSchema(): Promise<void> {
  await sql`CREATE TABLE IF NOT EXISTS sentences (
     id int PRIMARY KEY,
     sentence text NOT NULL
  )`;
}
