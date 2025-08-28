import { createFileRoute } from "@tanstack/react-router";
import * as motion from "motion/react-client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const numOfBoxes = ["yellow-200", "blue-200", "green-200", "yellow-200"];
  const initialYs = numOfBoxes.map((_, idx) => (numOfBoxes.length - 9) * idx);
  const initialOps = numOfBoxes.map((_, idx) => 1 - 0.2 * idx);
  const [yValues, setYValues] = useState(initialYs);
  const [isOpen, setIsOpen] = useState(false);
  const initialWidths = numOfBoxes.map((_, idx) => 200 - 20 * idx);
  const [widthValues, setWidthValues] = useState(initialWidths);
  const [ops, setOps] = useState(initialOps);

  const testOps = numOfBoxes.map((_, idx) => 1 - 0.05 * idx);
  const [opac, setOpac] = useState(testOps);

  function togglePosition() {
    if (isOpen) {
      setYValues(initialYs);
      setWidthValues(initialWidths);
      setOps(initialOps);
      setIsOpen(false);
    } else {
      const openYs = numOfBoxes.map((_, idx) => 65 * (idx + 1));
      const newWidths = new Array(numOfBoxes.length).fill(200);
      const newOps = new Array(numOfBoxes.length).fill(1);
      setWidthValues(newWidths);
      setYValues(openYs);
      setOps(newOps);
      setIsOpen(true);
    }
  }

  const len = numOfBoxes.length;
  // you can give tiny rotation offsets when closed, or all zero
  const closedR = useMemo(() => new Array(len).fill(0), [len]);

  // open state - interpolate across a range
  const openX = useMemo(() => {
    const st = 0;
    const ed = 40;
    if (len === 1) return [0];
    return numOfBoxes.map((_, i) => st + ((ed - st) * i) / (len - 1));
  }, [numOfBoxes, len]);

  const spreadX = useMemo(() => {
    const st = -130;
    const ed = 130;
    if (len === 1) return [0];
    return numOfBoxes.map((_, i) => st + ((ed - st) * i) / (len - 1));
  }, [numOfBoxes, len]);

  const openR = useMemo(() => {
    const startAngle = -20;
    const endAngle = 20;
    if (len === 1) return [0];
    return numOfBoxes.map(
      (_, i) => startAngle + ((endAngle - startAngle) * i) / (len - 1)
    );
  }, [numOfBoxes, len]);

  const [openFan, setOpenFan] = useState(false);
  const [xValues, setXValues] = useState(openX);
  const [rValues, setRValues] = useState(openR);

  function toggleFanStack() {
    if (openFan) {
      setOpac(testOps);
      setXValues(openX);
      setRValues(openR);
      setOpenFan(false);
    } else {
      const newOps = new Array(numOfBoxes.length).fill(1);
      setXValues(spreadX);
      setRValues(closedR);
      setOpac(newOps);
      setOpenFan(true);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="big bg-black p-2 flex flex-col items-center relative h-70"
        onClick={() => togglePosition()}
      >
        {numOfBoxes.map((box, i) => (
          <motion.div
            key={i}
            className={`bg-white h-15 rounded-sm flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            animate={{ y: yValues[i], opacity: ops[i] }}
            transition={{ type: "spring" }}
            style={{
              width: widthValues[i],
              zIndex: numOfBoxes.length - i,
            }}
          >
            {box}
          </motion.div>
        ))}
      </div>
      <div className="big bg-black p-2 flex flex-col items-center relative h-70">
        <Button onClick={() => toggleFanStack()}>
          {openFan ? "Close" : "Remove Image"}
        </Button>
        {numOfBoxes.map((box, i) => (
          <motion.div
            key={i}
            className={`bg-${box} w-20 !aspect-square sm:w-25 rounded-sm flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2`}
            animate={{ x: xValues[i], rotate: rValues[i], opacity: opac[i] }}
            transition={{ type: "spring" }}
            style={{
              zIndex: numOfBoxes.length - i,
            }}
          >
            <Button
              className={`mb-auto ml-auto rounded-full text-xs h-fit !max-h-fit !p-1 !w-fit ${openFan ? "flex" : "hidden"}`}
            >
              <X />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface SelectorProps {
  previews: string[];
  selectorFunction: (index: number) => void;
}

export function ImageSelector({ previews, selectorFunction }: SelectorProps) {
  const testOps = previews.map((_, idx) => 1 - 0.05 * idx);
  const [opac, setOpac] = useState(testOps);
  const len = previews.length;

  // you can give tiny rotation offsets when closed, or all zero
  const closedR = useMemo(() => new Array(len).fill(0), [len]);

  // open state - interpolate across a range
  const openX = useMemo(() => {
    const st = 0;
    const ed = 40;
    if (len === 1) return [0];
    return previews.map((_, i) => st + ((ed - st) * i) / (len - 1));
  }, [previews, len]);

  const spreadX = useMemo(() => {
    const st = -130 * (len / 4);
    const ed = 130 * (len / 4);
    if (len === 1) return [0];
    return previews.map((_, i) => st + ((ed - st) * i) / (len - 1));
  }, [previews, len]);

  const openR = useMemo(() => {
    const startAngle = -20;
    const endAngle = 20;
    if (len === 1) return [0];
    return previews.map(
      (_, i) => startAngle + ((endAngle - startAngle) * i) / (len - 1)
    );
  }, [previews, len]);

  const [openFan, setOpenFan] = useState(false);
  const [xValues, setXValues] = useState(openX);
  const [rValues, setRValues] = useState(openR);

  function toggleFanStack() {
    if (openFan) {
      setOpac(testOps);
      setXValues(openX);
      setRValues(openR);
      setOpenFan(false);
    } else {
      const newOps = new Array(previews.length).fill(1);
      setXValues(spreadX);
      setRValues(closedR);
      setOpac(newOps);
      setOpenFan(true);
    }
  }

  return (
    <div className="big p-2 pt-0 flex flex-col items-center relative w-4/5 aspect-[11/10] ">
      <Button type="button" onClick={() => toggleFanStack()} className="">
        {openFan ? "Done" : "Remove Image"}
      </Button>
      {previews.map((prev, i) => (
        <motion.div
          key={i}
          className={`bg-purple-200 w-20 !aspect-square sm:w-25 rounded-sm flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
          animate={{ x: xValues[i], rotate: rValues[i], opacity: opac[i] }}
          transition={{ type: "spring" }}
          style={{
            zIndex: previews.length - i,
          }}
        >
          <img src={prev} className="w-full aspect-square object-cover" />
          <Button
            type="button"
            onClick={() => selectorFunction(i)}
            className={`fixed top-1 right-1 rounded-full text-xs h-fit !max-h-fit !p-1 !w-fit ${openFan ? "flex" : "hidden"}`}
          >
            <X />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
