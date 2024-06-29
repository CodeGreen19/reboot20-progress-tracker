// components/CircularProgressBar.tsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  value: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ value }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full bg-[#00800043]">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: `rgba(34, 197, 94)`, // Tailwind green-500
            textColor: "#22c55e", // Tailwind green-500
            trailColor: "#000000a1", // Tailwind gray-300
            backgroundColor: "black", // Tailwind black
          })}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;
