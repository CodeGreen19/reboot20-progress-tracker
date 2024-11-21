import React from "react";

import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const ShowDays = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      {show ? (
        <Button className="text-blue-500" onClick={() => setShow(!show)}>
          {" "}
          close all days <ChevronUp className="p-1 text-sm" />
        </Button>
      ) : (
        <Button className="text-blue-500" onClick={() => setShow(!show)}>
          {" "}
          show all days <ChevronDown className="p-1 text-sm" />
        </Button>
      )}
    </div>
  );
};

export default ShowDays;
