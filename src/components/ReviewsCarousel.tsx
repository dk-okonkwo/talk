// import React, { useState } from 'react'
// import { ArrowUp2, ArrowDown2 } from 'iconsax-react'

// const CARDS = 10
// const MAX_VISIBILITY = 3

// export function Card({ title, content }: { title: string; content: string }) {
//   return (
//     <div className="card">
//       <h2>{title}</h2>
//       <p>{content}</p>
//     </div>
//   )
// }

// type ReviewsCarouselProps = {
//   children: React.ReactNode
// }

// export function ReviewsCarousel({ children }: ReviewsCarouselProps) {
//   const [active, setActive] = useState(2)
//   const count = React.Children.count(children)
//   return (
//     <div className="carousel w-auto relative flex items-center gap-3">
//       {React.Children.map(children, (child, i) => (
//         <div
//           className="card-container absolute !w-95 !h-95"
//           style={{
//             // '--active': i === active ? 1 : 0,
//             // '--offset': (active - i) / 3,
//             // '--direction': Math.sign(active - i) / 5,
//             // '--abs-offset': Math.abs(active - i) / 5,
//             // 'pointer-events': active === i ? 'auto' : 'none',
//             // opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
//             // display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
//           }}
//         >
//           {child}
//         </div>
//       ))}

//       <div className="flex flex-col items-center gap-3">
//         {active > 0 && (
//           <button
//             className="bg-yellow-300 z-300"
//             onClick={() => setActive((i) => i - 1)}
//           >
//             <ArrowUp2 className="!w-12 !h-12 stroke-[var(--primary)]" />
//           </button>
//         )}
//         {active < count - 1 && (
//           <button
//             className="bg-yellow-300 z-300"
//             onClick={() => setActive((i) => i + 1)}
//           >
//             <ArrowDown2 className="!w-12 !h-12 stroke-[var(--primary)]" />
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// function MainReviews() {
//   return (
//     <ReviewsCarousel>
//       {[...new Array(CARDS)].map((_, i) => (
//         <Card
//           title={'Card ' + (i + 1)}
//           content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//         />
//       ))}
//     </ReviewsCarousel>
//   )
// }

// export default MainReviews
