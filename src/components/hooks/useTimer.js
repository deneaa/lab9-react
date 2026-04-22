import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (duration, onTimeUp, startTime) => {
  const intervalRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(duration ?? null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!duration || !startTime) return;

    stop();

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        stop();
        onTimeUp();
      }
    }, 10);

    return stop;
  }, [startTime, duration, stop, onTimeUp]);

  return { timeLeft, stop };
};

export default useTimer;
