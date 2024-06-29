import React from "react";

import { Button } from "../ui/button";

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
          close all days
        </Button>
      ) : (
        <Button className="text-blue-500" onClick={() => setShow(!show)}>
          {" "}
          show all days
        </Button>
      )}
    </div>
  );
};

export default ShowDays;
