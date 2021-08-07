import { useEffect, useRef, useState } from "react";

const INTERVAL_DELAY = 500;

const useDice = (initial = 5) => {
  const [face, setFace] = useState(initial);
  const [thrown] = useState(true);

  const interval = useRef(null);

  useEffect(() => {
    if (thrown) {
      interval.current = setInterval(() => {
        setFace(Math.floor(Math.random() * 6) + 1);
      }, INTERVAL_DELAY);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [thrown]);

  return face;
};

export default useDice;
