import { getSentences } from "@/app/actions/get-sentences";
import { initStorageSchema } from "@/app/actions/init-storage-schema";
import { seedSentences } from "@/app/actions/seed-sentences";
import Timer from "@/components/timer";
import dynamic from "next/dynamic";

const GameWrapper = dynamic(() => import("../components/game-wrapper"), {
  ssr: false,
});

export default async function Home() {
  await initStorageSchema();
  await seedSentences();

  return (
    <div>
      <GameWrapper sentences={await getSentences()}></GameWrapper>
      <Timer />
    </div>
  );
}
