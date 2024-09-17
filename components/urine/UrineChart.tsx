"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";

export const description = "A line chart with dots";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type UrineChartType = {
  id: string;
  times: Date[];
  createdAt: Date;
  authorId: string;
};

type ChartType = {
  count: number;
  day: string;
};
let formatData = (data: UrineChartType[]): ChartType[] => {
  let info: ChartType[] = data.map((item) => ({
    count: item.times.length,
    day: format(item.createdAt, "MMM"),
  }));

  return info;
};

export function UrineChart({ data }: { data: UrineChartType[] }) {
  let chartData = formatData(data);

  return (
    <Card className="bg-slate-900 text-gray-300">
      <CardHeader>
        <CardTitle>Urine Chart - Dots</CardTitle>
        <CardDescription>
          {" "}
          from {format(data[0].createdAt, "MMMM")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="red"
              strokeWidth={2}
              dot={{
                fill: "purple",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing chart of my urine leaving...
        </div>
      </CardFooter>
    </Card>
  );
}
