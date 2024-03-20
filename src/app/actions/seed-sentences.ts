import { faker } from "@faker-js/faker";
import { sql } from "@vercel/postgres";

export async function seedSentences(): Promise<void> {
  const sentencesExist = !!(await sql`SELECT id FROM sentences`).rowCount;

  if (sentencesExist) {
    return;
  }

  await sql`INSERT INTO sentences (id, sentence) VALUES 
    (0, ${createRandomSentence()}),
    (1, ${createRandomSentence()}),
    (2, ${createRandomSentence()}),
    (3, ${createRandomSentence()}),
    (4, ${createRandomSentence()})`;
}

function createRandomSentence(): string {
  return `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.adjective()}`;
}
