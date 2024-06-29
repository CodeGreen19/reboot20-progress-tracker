import { format } from "date-fns";
import React from "react";

const FormatDate = (date: Date) => {
  return <>{format(date, "eee, dd MMM")}</>;
};

export default FormatDate;
