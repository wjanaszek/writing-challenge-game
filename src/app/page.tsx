import { initStorageSchema } from "@/app/actions/init-storage-schema";
import { seedSentences } from "@/app/actions/seed-sentences";
import SentenceToWrite from "@/components/sentence-to-write";

export default async function Home() {
  await initStorageSchema();
  await seedSentences();

  return (
    <div>
      <SentenceToWrite />
    </div>
  );
}
