import React, { useState, useEffect } from "react";

const Timer = ({ initialTime, startTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const newTimeLeft = Math.max(initialTime - timeElapsed, 0);
    setTimeLeft(newTimeLeft);

    if (newTimeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [initialTime, startTime]);

  return (
    <div>
      <small>
        {timeLeft <= 0 ? (
          <span className="text-red-500">Expired</span>
        ) : (
          <>
            {" "}
            Timer: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")} minutes left
          </>
        )}
      </small>
    </div>
  );
};

export default Timer;
