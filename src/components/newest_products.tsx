import { productDetails } from '@/data/workshop-data'
import StarReview from './StarReview'

function NewestProducts() {
  return (
    <div className="overflow-x-scroll flex items-center gap-2 my-3">
      {productDetails.map((prod, idx) => (
        <div
          key={idx}
          className="accent-bg w-42 min-w-42 h-60 rounded-sm overflow-hidden"
        >
          <img
            src={prod.imgUrl}
            alt="product image"
            className="h-65/100 aspect-auto"
          />
          <span className="px-2 py-2 font-bold text-lg">{prod.name}</span>
          <StarReview review={prod.review * 10} />
        </div>
      ))}
    </div>
  )
}

export default NewestProducts
