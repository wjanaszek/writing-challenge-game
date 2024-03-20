import { initStorageSchema } from "@/app/actions/init-storage-schema";
import { seedSentences } from '@/app/actions/seed-sentences';

export default async function Home() {
  await initStorageSchema();
  await seedSentences();

  return <div>Home</div>;
}
