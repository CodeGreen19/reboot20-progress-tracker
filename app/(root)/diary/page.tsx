"use client";

import CreateNewDiary from "@/components/diary/CreateNewDiary";
import Skeleton from "@/components/shared/Skeleton";
import { getUserDiaries } from "@/server/actions/diary.action";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { Fragment, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import Image from "next/image";
import ImageExpand from "@/components/diary/ImageExpand";

const DiaryPage = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  // First query to get user diaries
  const { data, isPending } = useQuery({
    queryKey: ["diaries"],
    queryFn: async () => {
      let data = await getUserDiaries();
      return data;
    },
  });

  // Use useEffect to trigger the scroll once data has been loaded
  useEffect(() => {
    if (data && divRef.current) {
      // Scroll to the bottom of the div
      window.scrollTo(0, divRef.current.scrollHeight);
    }
  }, [data]); // Run this effect when data changes
  return (
    <Fragment>
      {isPending && <Skeleton count={5} />}
      {data && data?.diaries?.length !== 0 ? (
        <div className="mb-14 p-3" ref={divRef}>
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
                        {item.secure_url && (
                          <ImageExpand img={item.secure_url}>
                            <Image
                              src={item.secure_url}
                              width={150}
                              height={150}
                              alt="dieryImg"
                              className="float-start mb-2 mr-2 mt-2 rounded-md"
                            />
                          </ImageExpand>
                        )}
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
          <div className="flex w-full items-center justify-end pb-3">
            <CreateNewDiary>
              <div className="mt-4 flex items-center justify-center text-sm font-semibold text-blue-500 hover:bg-transparent hover:text-blue-600">
                add new in your diary <FaArrowRight className="ml-2 text-xs" />
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
                <div className="mt-4 flex items-center justify-center text-sm text-blue-500 hover:bg-transparent hover:text-blue-600">
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
