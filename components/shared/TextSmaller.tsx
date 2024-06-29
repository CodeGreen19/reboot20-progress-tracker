import React from "react";

const TextSmaller = ({ text, count }: { text: string; count: number }) => {
  return <>{text.length >= count ? `${text.slice(0, count)}...` : text}</>;
};

export default TextSmaller;
