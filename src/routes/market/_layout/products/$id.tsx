import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGlobalContext } from "@/context/GlobalProvider"
import { createFileRoute } from '@tanstack/react-router'
import { Copy, Facebook, PaintRoller, ShoppingCart, Twitter } from "lucide-react"

export const Route = createFileRoute('/market/_layout/products/$id')({
  component: RouteComponent,
  loader: ({ params }) => {
    // Here you can fetch product data based on the id from params
    // For example, you might call an API to get product details
    const productId = params.id;
    console.log(`Fetching product with id: ${productId}`);
    
    return { productId}
  }
})

function RouteComponent() {

  const { productId }:{productId : string} = Route.useLoaderData()

  const {posts} = useGlobalContext()
  const product = posts?.find(p => p.id === productId) || null;
  if (!product) return <div className="h-[92vh] flex items-center justify-center">Product not found</div>
  const [primaryImage,...secondaryImage] = product.images
  return (
    <div className='bg-talkBG min-h-screen flex gap-8 px-8 py-4'>
      <main className=" max-w-1/2">
        <h3 className='font-medium text-pretty'>{product.name}</h3>
        <div className='flex items-center gap-1 my-4 text-xs tracking-wide'>  
          <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className='text-lg text-yellow-500'>★</span>
            ))} 
          </div>
          <p className='font-medium'>4.7 Star Rating</p>
          <p className='opacity-70'>(21,671 User feedback)</p>
        </div>
        <div className="space-y-3">
          <div className='p-8 border mx-auto w-fit rounded-md'>
            <img
              src={primaryImage}
              alt='Product Image'
              className='w-64 h-auto object-cover '
              loading='lazy'
            />
          </div>
          <Carousel className="w-full mx-auto max-w-md">
            <CarouselContent className="-ml-1">
              {secondaryImage.map((img, index) => (
                <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/6">
                    <Card>
                      <CardContent className="flex p-1 items-center justify-center ">
                        {/* <span className="text-2xl font-semibold">{index + 1} ge</span> */}
                        <img
                          src={img}
                          className=" object-cover aspect-square w-10"
                        />
                      </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 "/>
            <CarouselNext className="right-0 translate-x-1/2 "/>
          </Carousel>
        </div>
      </main>
      <main className="flex-1 space-y-5">
        <div className="text-black/80 text-sm flex justify-between">
          <h3>Availability : <span className="text-green-500 font-medium">In Stock</span></h3>
          <h3>Category : <span className="text-black font-medium">{product.category}</span></h3>
        </div>
        <div className="flex gap-3">
          <h3 className="font-medium text-xl flex items-center gap-1 text-blue-400">{(Number(product.price) * ((100-Number(product.discount))/100)).toFixed(2) } <span className="line-through text-base text-black/50">{product.price}</span></h3>
          <span className="px-2 py-1 text-sm bg-yellow-400 font-medium">{product.discount}% OFF</span>
        </div>
        <section className="border-t py-8 space-y-6">
          <div className="flex gap-4 text-sm *:rounded-xs">
            <div className="border *:p-2.5 w-fit">
              <button>-</button>
              <button className="px-5">01</button>
              <button>+</button>
            </div>
            <button className="py-2.5 px-auto flex-1 justify-center font-medium uppercase flex gap-1 bg-main text-white">Message Vendor <ShoppingCart className="size-4"/></button>
            <button className="py-2.5 px-4 font-medium uppercase text-main border border-main">Save</button>
          </div>
          <div className="text-sm text-black/50 justify-center flex gap-2">
            <p>Share product :</p>
            <div className="flex gap-3 *:size-4.5">
              <Copy/>
              <Facebook/>
              <Twitter/>
              <PaintRoller/>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-sm">
          <div className="flex justify-evenly gap-4 text-sm uppercase font-medium *:border-b *:border-main *:p-4 border-b">
            <p>Description</p>
            <p>Vendor</p>
            <p>Reviews</p>
          </div>
          <div className="py-10 px-4 space-y-4">
            <h3 className="font-medium">Description</h3>
            <p className="text-black/60 text-sm">{product.description}</p>
          </div>
        </section>
      </main>
    </div>
  )
}
