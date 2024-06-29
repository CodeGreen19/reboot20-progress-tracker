import React from "react";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { GoalType } from "@/server/schema";
import { ShowProgressInPercent } from "../statistics";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);

const LineChart = ({ data }: { data: GoalType }) => {
  let length = data.tasks?.length;

  let dataSet_data = data.tasks?.map((task) => {
    return ShowProgressInPercent(task.dayTasks!);
  });

  const lineData = {
    labels: data.tasks?.map((_, i) => `${i + 1} days`),
    datasets: [
      {
        label: "Day Progress",
        data: dataSet_data,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  return (
    <div>
      {" "}
      <Line data={lineData} />
    </div>
  );
};

export default LineChart;
