"use client";

import { Loader, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { useQuery } from "@tanstack/react-query";
import { allPrayers } from "@/server/actions/pray.action";
import { Fragment } from "react";
import { format } from "date-fns";
type DataType = {
  id: string;
  Fazar: boolean;
  Jahar: boolean;
  Ashar: boolean;
  Magrib: boolean;
  Esha: boolean;
  createdAt: Date;
  updatedAt: Date;
};
const chartConfig = {
  prayed: {
    label: "prayed",
    color: "#0000ffa6",
  },
} satisfies ChartConfig;

export function PrayChart() {
  const { data, isPending } = useQuery({
    queryKey: ["allPrayers"],
    queryFn: async () => (await allPrayers()).allprayers,
  });
  // let chartData: { day: number; prayed: number }[] = [];
  const dataHandler = (data: DataType[]): { day: number; prayed: number }[] => {
    let prayed: number = 0;
    let info = data.map((item, i) => {
      if (item.Fazar) prayed++;
      if (item.Jahar) prayed++;
      if (item.Ashar) prayed++;
      if (item.Magrib) prayed++;
      if (item.Esha) prayed++;
      let data = { day: i + 1, prayed };
      prayed = 0;
      return data;
    });
    return info;
  };
  return (
    <Fragment>
      {isPending ? (
        <div className="flex w-full items-center justify-center py-2 text-lg">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <Card className="bg-neutral-900 text-white has-[hr]:bg-red-500">
          <CardHeader>
            <CardTitle>Prayer Charts</CardTitle>
            <CardDescription>
              Showing the consistency of my prayers
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={dataHandler(data!)}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} stroke="transparent" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={0}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillPrayed" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-prayed)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-prayed)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="prayed"
                  type="basis"
                  fill="url(#fillPrayed)"
                  fillOpacity={1}
                  stroke="var(--color-prayed)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  The statistics of my prayer progress{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 text-xs leading-none text-muted-foreground">
                  {format(data![0].createdAt, "dd MMMM")} to{" "}
                  {format(data![data?.length! - 1].createdAt, "dd MMMM")}{" "}
                  {data![data?.length! - 1].createdAt.getFullYear()}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </Fragment>
  );
}
