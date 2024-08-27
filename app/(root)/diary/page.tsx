"use client";

import CreateNewDiary from "@/components/diary/CreateNewDiary";
import Skeleton from "@/components/shared/Skeleton";
import { getUserDiaries } from "@/server/actions/diary.action";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";

const DiaryPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["diaries"],
    queryFn: async () => await getUserDiaries(),
  });

  return (
    <Fragment>
      {isPending && <Skeleton count={3} />}
      {data && data?.diaries?.length !== 0 ? (
        <div className="mb-14 p-3">
          <div className="rounded-xl bg-stone-900 p-3 text-sm text-slate-300">
            {data?.diaries?.map((item, i) => (
              <div key={i}>
                <h1 className="my-3 text-sm font-bold text-sky-500">
                  {`${format(item.createdAt, "PPP")} (${format(item.createdAt, "ccc")})`}
                </h1>
                <ul>
                  {item.diaryText.map((item, i) => (
                    <li
                      key={i}
                      className="my-1 flex items-start justify-start gap-3"
                    >
                      <span>
                        <FaCaretRight className="mt-1 text-purple-500" />
                      </span>{" "}
                      <p>
                        <span className="mr-1 text-[0.8rem] text-slate-400">
                          {`(${format(item.createdAt!, "p")})`}
                        </span>
                        <span className="text-slate-200"> {item.text}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center">
            <CreateNewDiary>
              <div className="mt-4 flex items-center justify-center text-sm text-blue-500 underline hover:bg-transparent hover:text-blue-600">
                add new in your diary <FaArrowRight className="ml-2" />
              </div>
            </CreateNewDiary>
          </div>
        </div>
      ) : (
        !isPending && (
          <div>
            <div className="my-6 w-full text-center">
              no diary has been created yet !
            </div>
            <div className="flex w-full items-center justify-center">
              <CreateNewDiary>
                <div className="mt-4 flex items-center justify-center text-sm text-blue-500 underline hover:bg-transparent hover:text-blue-600">
                  add new in your diary <FaArrowRight className="ml-2" />
                </div>
              </CreateNewDiary>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default DiaryPage;
