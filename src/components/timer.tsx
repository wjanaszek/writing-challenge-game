"use client";
import { useEffect, useState } from "react";

const ROUND_DURATION_IN_MS = 15 * 1000;
const ONE_SECOND_IN_MS = 1000;

export default function Timer() {
  const [endTime, setEndTime] = useState<number | null>(
    Date.now() + ROUND_DURATION_IN_MS,
  );
  const [timeLeft, setTimeLeft] = useState<number>(
    ROUND_DURATION_IN_MS / ONE_SECOND_IN_MS,
  );

  useEffect(
    function initRoundInterval() {
      const timer = setInterval(() => {
        updateTimeLeft();
      }, ONE_SECOND_IN_MS);

      return () => clearInterval(timer);
    },
    [endTime],
  );

  const updateTimeLeft = () => {
    if (!endTime) {
      return;
    }

    const now = Date.now();
    const diff = endTime - now;
    const timeLeft = Math.max(0, Math.ceil(diff / ONE_SECOND_IN_MS));

    if (timeLeft <= 0) {
      startNewRound(now);
      return;
    }

    setTimeLeft(Math.max(0, Math.ceil(diff / ONE_SECOND_IN_MS)));
  };

  const startNewRound = async (nowTime: number) => {
    setEndTime(nowTime + ROUND_DURATION_IN_MS);
    setTimeLeft(ROUND_DURATION_IN_MS / ONE_SECOND_IN_MS);
  };

  return (
    <div>
      <h2>
        Time left: {timeLeft ? Math.max(0, Math.ceil(timeLeft)) : 0} seconds
      </h2>
    </div>
  );
}
