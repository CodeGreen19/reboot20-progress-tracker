import React from "react";

const Skeleton = ({ count }: { count: number }) => {
  let c = [];
  for (let i = 0; i < count; i++) {
    c.push(i);
  }
  return (
    <div>
      {count <= 1 ? (
        <div className="m-3 h-28 animate-pulse rounded-lg bg-[#181818]"></div>
      ) : (
        c.map((_, i) => (
          <div
            key={i}
            className="m-3 h-28 animate-pulse rounded-lg bg-[#181818]"
          ></div>
        ))
      )}
    </div>
  );
};

export default Skeleton;
