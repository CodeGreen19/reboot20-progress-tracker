"use client";

import React, { useState } from "react";

const identity = <T,>(arg: T): T => {
  return arg;
};
function echo<T>(arg: T): T {
  return arg;
}

const AnalyticsPage = () => {
  const data = identity("sdlfas");
  const e = echo("sdlfas");

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ratione eum
      ducimus, unde doloribus autem distinctio impedit vero, dolores hic
      voluptatum laboriosam delectus id. Quisquam sunt praesentium unde
      obcaecati nihil.
    </div>
  );
};

export default AnalyticsPage;
