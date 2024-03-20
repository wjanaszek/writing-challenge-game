import { initStorageSchema } from "@/app/actions/init-storage-schema";
import { seedSentences } from "@/app/actions/seed-sentences";
import SentenceToWrite from "@/components/sentence-to-write";
import Timer from "@/components/timer";

export default async function Home() {
  await initStorageSchema();
  await seedSentences();

  return (
    <div>
      <SentenceToWrite />
      <Timer />
    </div>
  );
}
