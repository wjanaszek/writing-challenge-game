export type ActivePlayer = {
  id: string;
  name: string;
};

export type PlayerStats = {
  id: string;
  name: string;
  wordsPerMinute: number;
  accuracy: number;
};

export type PlayerStatsUpdateChunkMessage = {
  id: string;
  name: string;
  wordsPerMinute: number;
  accuracy: number;
};

export type ActiveSentenceMessage = {
  activeSentence: string;
}
