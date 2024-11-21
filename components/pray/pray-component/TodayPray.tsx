"use client";

import React, { useState } from "react";
import { PrayNamesType } from "../data";
import { BadgeCheck, Loader } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPray, todayPray } from "@/server/actions/pray.action";

const prayerNames: PrayNamesType[] = [
  "Fazar",
  "Jahar",
  "Ashar",
  "Magrib",
  "Esha",
];

const TodayPray = () => {
  const queryclient = useQueryClient();
  const [selectedPrayName, setSelectedPrayName] =
    useState<PrayNamesType | null>(null);
  const { data, isPending: prayloading } = useQuery({
    queryKey: ["today-pray"],
    queryFn: async () => {
      let data = await todayPray();
      if (data.error) {
        return null;
      } else {
        return data.info;
      }
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: addPray,
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: ["today-pray"],
      });
      await queryclient.invalidateQueries({ queryKey: ["allPrayers"] });
    },
  });
  const handleSubmit = (name: PrayNamesType) => {
    setSelectedPrayName(name);
    mutate(name);
  };
  return (
    <div className="mt-4 rounded-xl bg-neutral-900 p-4">
      <h1 className="font-bold text-yellow-500"> Today</h1>
      <desc className="mb-2 text-xs text-gray-400">
        Click the prayer that you have done !
      </desc>
      {!prayloading && (
        <div className="grid grid-cols-5 gap-2">
          {prayerNames.map((item) => (
            <div
              onClick={() => handleSubmit(item)}
              key={item}
              className="relative cursor-pointer rounded-md bg-neutral-800 p-4 text-neutral-400 has-[h1]:bg-emerald-500/5 has-[h1]:text-green-500"
            >
              {item}
              <div className="absolute right-0 top-1">
                {(data?.Fazar && item === "Fazar") ||
                (data?.Jahar && item === "Jahar") ||
                (data?.Ashar && item === "Ashar") ||
                (data?.Magrib && item === "Magrib") ||
                (data?.Esha && item === "Esha") ? (
                  <>
                    <h1 className="sr-only"></h1>
                    <BadgeCheck className="p-1 text-green-500" />
                  </>
                ) : (
                  isPending &&
                  item === selectedPrayName && (
                    <Loader className="animate-spin p-1" />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayPray;
