import React from "react";
import { Button } from "../ui/button";

const CurrentTaskCard = () => {
  let success = 90;
  return (
    <div className="relative m-3 rounded-xl border bg-[#181818] p-3">
      <div>
        <h2>
          Goal : <span>this is the project title to show....</span>
        </h2>
        <h3 className="text-sm">
          Date :{" "}
          <span>
            Sun, 12 may <span className="text-gray-400">to</span> Fri, 14 may{" "}
          </span>
        </h3>

        <h1>
          Status : <span className="text-sm text-green-600">on going</span>
        </h1>
        <div className="flex items-center justify-between">
          <h1>
            Overall Success : <span className="text-sm">processing</span>
          </h1>
          <Button
            className="text-green-500 hover:bg-transparent hover:text-green-700"
            variant={"ghost"}
          >
            complete task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentTaskCard;
