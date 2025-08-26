// "use client";

// import { spring } from "motion";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { SlidersHorizontal } from "lucide-react";

// export default function FilterButton() {
//     const [state, setState] = useState(false);

//   return (
//     <div className="example-container bg-yellow-200">
//       <div className="box" data-state={state} />
//       <Button
//         type="button"
//         className="h-15 w-15 box"
//         data-state={state}
//         onClick={() => setState(!state)}
//       >
//         <SlidersHorizontal />
//       </Button>

//       <style>
//         {`
//                     .example-container {
//                         display: flex;
//                         flex-direction: column;
//                         align-items: center;
//                         justify-content: center;
//                         gap: 20px;
//                     }

//                     .example-container .box {
//                         width: 70px;
//                         height: 70px;
//                         background-color: #8df0cc;
//                         border-radius: 10px;
//                         transition: transform ${spring(0.5, 0.8)};
//                         transform: translateX(-350%);
//                     }

//                     .example-container .box[data-state="true"] {
//                         transform: translateX(400%) rotate(180deg);
//                     }

//                     .example-container button {
//                         background-color: #8df0cc;
//                         color: #0f1115;
//                         border-radius: 5px;
//                         padding: 10px;
//                         margin: 10px;
//                     }
//                 `}
//       </style>
//     </div>
//   );
// }
