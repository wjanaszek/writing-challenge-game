import { apiUrl } from "@/utils/api-url";

export default async function SentenceToWrite() {
  const sentencesResponse = await fetch(`${apiUrl()}/api/sentences`, {
    method: "GET",
  });
  const sentences = (await sentencesResponse.json()).data;

  return (
    <div>
      <h2>Write this: &quot;{sentences[0].value}&quot;</h2>
    </div>
  );
}
