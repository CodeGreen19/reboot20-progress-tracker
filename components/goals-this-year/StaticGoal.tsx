import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFlag } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { thisYearGoalData } from "./data";

const StaticGoal = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="m-auto h-[97%] max-w-2xl bg-neutral-800">
          <DrawerHeader>
            <DrawerTitle className="rounded-3xl border border-dashed border-yellow-400 bg-neutral-900 p-4 text-green-500">
              The ultimate goals of <span className="text-white">2025</span>
            </DrawerTitle>
            <div className="relative">
              <div className="top absolute left-0 top-3 z-20 h-5 w-full bg-gradient-to-b from-neutral-800 to-transparent"></div>
              <div className="bottom absolute bottom-0 left-0 z-20 h-5 w-full bg-gradient-to-t from-neutral-800 to-transparent"></div>
              <div className="goal-task-show-box relative mt-3 h-[80vh] space-y-5 overflow-y-scroll text-start">
                {thisYearGoalData.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-md bg-neutral-900 p-2 py-6"
                  >
                    <h1
                      className={cn(
                        "mb-2 ml-2 flex items-center gap-2 font-semibold",
                        item.color,
                      )}
                    >
                      {" "}
                      <BiSolidCategoryAlt /> {item.title}
                    </h1>
                    <ul className="rounded-md border border-dashed border-green-500/50 bg-neutral-500/5 p-2 *:flex *:items-center *:gap-2">
                      <li className="mb-1 text-green-400">
                        <BsFlag className="text-green-500" /> Persuit
                      </li>
                      {item.tasks.map((task, i) => (
                        <li key={i} className="text-sm text-gray-200">
                          {" "}
                          <FaCheckCircle className="text-xs text-blue-600" />
                          {task}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 rounded-md border border-dashed border-red-800 bg-red-300/5 p-2">
                      <h1 className="flex items-center gap-2 text-red-500">
                        <GoAlert />
                        Avoid
                      </h1>
                      <ul>
                        {item.avoid.map((task, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-neutral-400"
                          >
                            {" "}
                            <RiDeleteBack2Fill className="text-yellow-500/75" />{" "}
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default StaticGoal;
