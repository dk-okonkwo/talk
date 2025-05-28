

function ProductCollection({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="flex flex-col gap-3">
      <img src={imgUrl} alt="collections" className="rounded-sm w-72 h-66" />
      <div className="w-full flex items-center justify-between">
        <img src={imgUrl} alt="collections" className="rounded-sm w-20 h-20" />
        <img src={imgUrl} alt="collections" className="rounded-sm w-20 h-20" />
        <span className="flex items-center justify-center w-20 h-20 rounded-sm primary-bg font-bold text-white text-md">
          25+
        </span>
          </div>
          <span className="font-bold text-xl normal-text">Turbo Engines</span>
    </div>
  )
}

export default ProductCollection
