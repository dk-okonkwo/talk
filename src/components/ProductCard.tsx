import { Heart, MessageCircle, NotepadText, Send } from "lucide-react"

const ProductCard = () => {
  return (
    <div className="relative min-w-32 mx-auto group space-y-2 rounded-lg overflow-hidden border shadow  hover:scale-105 hover:shadow-lg transition duration-200 ease-in-out">
      <img
        src='/images/product-demo.png'
        alt="product"
        className=' object-cover group-hover:scale-95 group-hover:rounded-md  transition duration-200 ease-in-out'
      />
      <div className="flex flex-col px-2 pb-2 sm:pb-6">
        <h2 className="font-semibold sm:text-base text-sm">Syltherin</h2>
        <p className="opacity-60 text-[10px] sm:text-xs font-light">Stlish cafe chair</p>
        <h3 className="flex flex-wrap sm:gap-2 text-xs sm:text-sm mt-1 font-medium items-center">Rp 2.500.000<span className="opacity-50 line-through text-[10px] sm:text-xs">Rp 3.500.000</span></h3>

      </div>
      <div className="absolute inset-0 opacity-0 backdrop-blur-[2px] flex gap-5 flex-col justify-center items-center bg-black/50 group-hover:opacity-100 transition duration-200 ease-in-out">
        <button className="flex items-center gap-1 p-2  text-main font-medium bg-white rounded-md hover:bg-main hover:text-white hover:scale-x-105 hover:font-light transition"><MessageCircle size={18}/>Message</button>
        <div className="flex flex-col gap-2 text-sm  text-white *:*:size-4  *:flex *:gap-1 *:items-center *:hover:scale-105 *:transition ">   
          <p><Heart/>Like</p>
          <p><NotepadText/>Description</p>
          <p><Send/>Share</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard