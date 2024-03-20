import { sql } from "@vercel/postgres";

export async function getSentences(): Promise<string[]> {
  const { rows } = await sql`SELECT sentence FROM sentences ORDER BY id ASC`;

  return rows.map((row) => row.sentence);
}
