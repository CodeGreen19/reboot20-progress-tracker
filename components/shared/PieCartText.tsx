import React from "react";

const PieCartText = ({
  complete,
  incomplete,
  className,
}: {
  complete: number;
  incomplete: number;
  className: string;
}) => {
  return (
    <p className={className}>
      <h2 className="text-sm">
        <span className="text-green-500">{complete}%</span> completed and{" "}
        <span className="text-red-400">{incomplete}%</span> incompleted
      </h2>
    </p>
  );
};

export default PieCartText;
