// import React, { useState } from 'react'
// import { ArrowUp2, ArrowDown2 } from 'iconsax-react'
// import { userReviews } from '@/data/workshop-data'

// const max_vis = 2

// function ReviewCard({ title, content }: { title: string; content: string }) {
//   return (
//     <div className="bg-white rounded-md p-2 w-100 h-100">
//       <h2>{title}</h2>
//       <h2>{content}</h2>
//     </div>
//   )
// }

// type CarouselContainerProps = {
//   children: React.ReactNode
// }

// function CarouselContainer({ children }: CarouselContainerProps) {
//   const [active, setActive] = useState(2)
//   const count = React.Children.count(children)
//     return (
//       <div className='flex items-center gap-10'>
//         <div className="carousel-2">
//           {React.Children.map(children, (child, i) => (
//             <div
//               className="w-95 h-95 card-container-2"
//               style={{
//                 // '--active': i === active ? 1 : 0,
//                 // '--offset': (active - i) / 5,
//                 // '--direction': Math.sign(active - i) / 3,
//                 // '--abs-offset': Math.abs(active - i) / 1.5,
//                 // 'pointer-events': active === i ? 'auto' : 'none',
//                 // opacity: Math.abs(active - i) >= max_vis ? '0' : '1',
//                 // display: Math.abs(active - i) > max_vis ? 'none' : 'block',
//               }}
//             >
//               {child}
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col items-center gap-3">
//           {active > 0 && (
//             <button
//               className="bg-yellow-300"
//               onClick={() => setActive((i) => i - 1)}
//             >
//               <ArrowUp2 className="!w-12 !h-12 stroke-[var(--primary)]" />
//             </button>
//           )}
//           {active < count - 1 && (
//             <button
//               className="bg-yellow-300"
//               onClick={() => setActive((i) => i + 1)}
//             >
//               <ArrowDown2 className="!w-12 !h-12 stroke-[var(--primary)]" />
//             </button>
//           )}
//         </div>
//       </div>
//     )
// }

// function WorkshopReviews() {
//   return (
//     <CarouselContainer>
//       {userReviews.map((review, i) => (
//         <ReviewCard title={review.name} content={review.desc} />
//       ))}
//     </CarouselContainer>
//   )
// }

// export default WorkshopReviews
