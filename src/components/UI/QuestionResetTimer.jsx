import { useState, useEffect } from "react";
import Button from "./Button";

// Timer component showing when users can answer questions again
const QuestionResetTimer = ({ dailyScoreDate }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!dailyScoreDate) return;

    const updateTimer = () => {
      const now = new Date();
      const startDate = new Date(dailyScoreDate);

      // Calculate next reset time (start date + 12 hours)
      const nextReset = new Date(startDate.getTime() + 12 * 60 * 60 * 1000);

      // Calculate time remaining
      const remaining = nextReset.getTime() - now.getTime();

      if (remaining <= 0) {
        setTimeRemaining("Questions available now!");
        return;
      }

      // Convert to hours and minutes for real timer display
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    };

    // Update immediately
    updateTimer();

    // Update every minute
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, [dailyScoreDate]);

  if (!dailyScoreDate || !timeRemaining) return null;

  return (
    <Button variant="message" className="w-full mt-2">
      Can answer questions again in {timeRemaining}
    </Button>
  );
};

export default QuestionResetTimer;
