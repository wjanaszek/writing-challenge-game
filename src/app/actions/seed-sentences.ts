import { faker } from "@faker-js/faker";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export async function seedSentences(): Promise<void> {
  const sentencesExist = !!(await sql`SELECT id FROM sentences`).rowCount;

  if (sentencesExist) {
    return;
  }

  await sql`INSERT INTO sentences (id, sentence) VALUES 
    (${randomUUID()}, ${createRandomSentence()}),
    (${randomUUID()}, ${createRandomSentence()}),
    (${randomUUID()}, ${createRandomSentence()}),
    (${randomUUID()}, ${createRandomSentence()}),
    (${randomUUID()}, ${createRandomSentence()})`;
}

function createRandomSentence(): string {
  return `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.adjective()}`;
}
