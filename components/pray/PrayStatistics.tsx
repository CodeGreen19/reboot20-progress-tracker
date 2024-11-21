import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import TodayPray from "./pray-component/TodayPray";
import { PrayChart } from "./pray-component/PrayChart";

const PrayStaistics = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="m-auto h-[97%] max-w-xl bg-neutral-800 px-0">
          <DrawerHeader>
            <DrawerTitle className="rounded-3xl border border-dashed border-green-400 bg-neutral-900 p-4 text-green-500">
              Mesuring Prayer Progresss
            </DrawerTitle>
            <TodayPray />
            <PrayChart />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PrayStaistics;
