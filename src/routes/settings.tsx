// import { createFileRoute } from "@tanstack/react-router";
// import * as motion from "motion/react-client";
// import { useState, useMemo } from "react";
// // import { Button } from "@/components/ui/button";
// // import { X } from "lucide-react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import TalkNotifications from "@/components/TalkNotifications";

// export const Route = createFileRoute("/settings")({
//   component: SettingsPage,
// });

// function SettingsPage() {
//   const numOfBoxes = [
//     "Notification-0",
//     "Notification-1",
//     "Notification-2",
//     "Notification-3",
//     "Notification-4",
//     "Notification-5",
//     "Notification-6",
//     "Notification-7",
//     "Notification-8",
//     "Notification-9",
//   ];
//   const initialYs = numOfBoxes.map((_, idx) => -6 * idx);
//   const initialOps = numOfBoxes.map((_, idx) => 1 - 0.2 * idx);
//   const [yValues, setYValues] = useState(initialYs);
//   const [isOpen, setIsOpen] = useState(false);
//   const initialWidths = numOfBoxes.map((_, idx) => 200 - 20 * idx);
//   const [widthValues, setWidthValues] = useState(initialWidths);
//   const [ops, setOps] = useState(initialOps);

//   const testOps = numOfBoxes.map((_, idx) => 1 - 0.05 * idx);
//   const [opac, setOpac] = useState(testOps);

//   function togglePosition() {
//     if (isOpen) {
//       setYValues(initialYs);
//       setWidthValues(initialWidths);
//       setOps(initialOps);
//       setIsOpen(false);
//     } else {
//       const openYs = numOfBoxes.map((_, idx) => 10 * (idx + 1));
//       const newWidths = new Array(numOfBoxes.length).fill(200);
//       const newOps = new Array(numOfBoxes.length).fill(1);
//       setWidthValues(newWidths);
//       setYValues(openYs);
//       setOps(newOps);
//       setIsOpen(true);
//     }
//   }

//   const len = numOfBoxes.length;
//   // you can give tiny rotation offsets when closed, or all zero
//   const closedR = useMemo(() => new Array(len).fill(0), [len]);

//   // open state - interpolate across a range
//   const openX = useMemo(() => {
//     const st = 0;
//     const ed = 40;
//     if (len === 1) return [0];
//     return numOfBoxes.map((_, i) => st + ((ed - st) * i) / (len - 1));
//   }, [numOfBoxes, len]);

//   const spreadX = useMemo(() => {
//     const st = -130;
//     const ed = 130;
//     if (len === 1) return [0];
//     return numOfBoxes.map((_, i) => st + ((ed - st) * i) / (len - 1));
//   }, [numOfBoxes, len]);

//   const openR = useMemo(() => {
//     const startAngle = -20;
//     const endAngle = 20;
//     if (len === 1) return [0];
//     return numOfBoxes.map(
//       (_, i) => startAngle + ((endAngle - startAngle) * i) / (len - 1)
//     );
//   }, [numOfBoxes, len]);

//   const [openFan, setOpenFan] = useState(false);
//   const [xValues, setXValues] = useState(openX);
//   const [rValues, setRValues] = useState(openR);

//   function toggleFanStack() {
//     if (openFan) {
//       setOpac(testOps);
//       setXValues(openX);
//       setRValues(openR);
//       setOpenFan(false);
//     } else {
//       const newOps = new Array(numOfBoxes.length).fill(1);
//       setXValues(spreadX);
//       setRValues(closedR);
//       setOpac(newOps);
//       setOpenFan(true);
//     }
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="big bg-black p-2 flex flex-col items-center h-70">
//         <ScrollArea className="bg-gray-700 min-h-20 relative rounded-sm max-h-90 p-2">
//           {numOfBoxes.map((box, i) => (
//             <motion.div
//               key={i}
//               onClick={() => {
//                 if (i === 0) togglePosition();
//               }}
//               className={`bg-white hover:cursor-pointer h-15 rounded-sm flex items-center justify-center ${!isOpen && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}  ${!isOpen && i > 2 ? "hidden" : "flex"}`}
//               animate={{ y: yValues[i], opacity: ops[i] }}
//               transition={{ type: "spring" }}
//               style={{
//                 width: widthValues[i],
//                 zIndex: numOfBoxes.length - i,
//               }}
//             >
//               {box}
//             </motion.div>
//           ))}
//         </ScrollArea>
//       </div>
//       {/* <div className="big bg-black p-2 flex flex-col items-center relative h-70">
//         <Button onClick={() => toggleFanStack()}>
//           {openFan ? "Close" : "Remove Image"}
//         </Button>
//         {numOfBoxes.map((box, i) => (
//           <motion.div
//             key={i}
//             className={`bg-${box} w-20 !aspect-square sm:w-25 rounded-sm flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2`}
//             animate={{ x: xValues[i], rotate: rValues[i], opacity: opac[i] }}
//             transition={{ type: "spring" }}
//             style={{
//               zIndex: numOfBoxes.length - i,
//             }}
//           >
//             <Button
//               className={`mb-auto ml-auto rounded-full text-xs h-fit !max-h-fit !p-1 !w-fit ${openFan ? "flex" : "hidden"}`}
//             >
//               <X />
//             </Button>
//           </motion.div>
//         ))}
//       </div> */}
//       <TalkNotifications />
//     </div>
//   );
// }
