import type { TopProductDetail } from '@/data/workshop-data'
import StarReview from './StarReview'

function TopProductItem({ product }: { product: TopProductDetail }) {
  return (
    <div className="w-70 h-80 accent-bg mx-auto rounded-md overflow-clip relative">
      <img src={product.imgUrl} alt="product img" className="w-full h-70/100" />
      <div className="flex flex-col p-3 gap-1">
        <span className="font-bold text-xl bg-text">{product.name}</span>
        <StarReview
          review={product.review * 10}
        />
      </div>
      {product.discount > 0 && (
        <div className="bg-red-400 w-12 h-12 absolute right-3 top-3 flex items-center justify-center rounded-full">
          <span className="font-bold text-white">
            -{product.discount * 100}%
          </span>
        </div>
      )}
    </div>
  )
}

export default TopProductItem
