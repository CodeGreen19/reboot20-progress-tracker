// components/ChartComponent.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GoalType } from "@/server/schema";
import { ShowMoreSuccessfullTask } from "../statistics";

ChartJS.register(ArcElement, Tooltip, Legend);

const ShowPieChart = ({ data }: { data: GoalType }) => {
  let pieLabels = data.tasks![0].dayTasks?.map((task) => task.title);
  const doughnutData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Achieved",
        data: ShowMoreSuccessfullTask(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default ShowPieChart;
