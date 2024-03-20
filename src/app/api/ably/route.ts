import Ably from "ably/promises";

export async function GET(): Promise<Response> {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "writing-challenge-game",
  });

  return Response.json(tokenRequestData);
}
