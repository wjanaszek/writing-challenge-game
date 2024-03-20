import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Sentence = {
  id: string;
  value: string;
};

// TODO create some utils & types to handle responses
export async function GET(): Promise<NextResponse<{ data: Sentence[] }>> {
  const { rows } = await sql`SELECT * FROM sentences`;
  return NextResponse.json(
    { data: rows.map((row) => ({ id: row.id, value: row.sentence })) },
    { status: 200 },
  );
}
