import { useState, useEffect } from "react";

const Loader = ({ duration = 600 }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity((prevOpacity) => Math.max(0, prevOpacity - 0.1));

      if (opacity <= 0) {
        setOpacity(1);
      }
    }, duration / 10);

    return () => clearInterval(intervalId);
  }, [opacity, duration]);
  return (
    <>
      <h1
        className="text-4xl font-extrabold text-gray-600"
        style={{ opacity, transition: `opacity ${duration}ms linear` }}
      >
        Loading...
      </h1>
    </>
  );
};

export default Loader;
