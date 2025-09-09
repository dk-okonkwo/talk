import { createFileRoute } from "@tanstack/react-router";
import workBanner from "@/assets/images/workbanner.jpg";
import ProductCollection from "@/components/Collection";
import { CarouselPlugin } from "@/components/flyerCarousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star1, Eye } from "iconsax-react";
import bm1 from "@/assets/images/bmw1.jpeg";
import bm2 from "@/assets/images/bmw2.jpg";
import bm3 from "@/assets/images/greybm.jpeg";
import TopProductItem from "@/components/TopProduct";
import { productDetails } from "@/data/workshop-data";
import { Button } from "@/components/ui/button";
// import MainReviews, { ReviewsCarousel } from '@/components/ReviewsCarousel'
// import WorkshopReviews from '@/components/WorkshopReviews'
import NewestProducts from "@/components/newest_products";

const collections: string[] = [bm1, bm2, bm3];

export const Route = createFileRoute("/workshop/$id")({
  component: WorkshopComponent,
});

function WorkshopComponent() {
  return (
    <div className="flex flex-col gap-2 mb-100">
      <AspectRatio ratio={10 / 4} className="">
        <img src={workBanner} alt="banner" className="w-full h-full" />
      </AspectRatio>
      <div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold bg-text">JOSH AUTO EMPIRE</span>
          <span className="text-xl font-bold primary-text">
            BMW Auto Dealership
          </span>
        </div>
        <span className="normal-text text-lg">
          Get the best deals on all things automotive, from cars to bikes at
          very affordable rates. We deliver faster than the Hebrew women.
        </span>
        <NewestProducts />
        <div className="flex items-center justify-center">
          <CarouselPlugin />
        </div>
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star1
                key={index}
                variant="Bold"
                className="fill-[var(--primary)] w-7"
              />
            ))}
          </div>
          <span className="text-lg font-bold bg-text">4.7 Star Rating</span>
          <span className="normal-text text-lg">(21,671 User Feedback)</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <span className="bg-text font-bold text-2xl">Collections</span>
          <span className="primary-text text-xl">
            Checkout Josh Auto Empire's Collection
          </span>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-4">
          {collections.map((coll, index) => (
            <ProductCollection imgUrl={coll} key={index} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div>
        <div className="flex flex-col">
          <span className="bg-text font-bold text-2xl">Top Products</span>
          <span className="primary-text text-xl">
            Explore Vendor's Top Products
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {productDetails.map((product, index) => (
          <TopProductItem key={index} product={product} />
        ))}
      </div>
      <Button
        variant="outline"
        className="w-fit self-center p-5 border-2 border-[var(--primary)]"
      >
        <Eye className="!w-5 !h-5 stroke-[var(--primary)]" />
        <span>See All</span>
      </Button>
      <div className="flex flex-col">
        <span className="bg-text font-bold text-2xl">Reviews</span>
        <span className="primary-text text-xl">What People Say</span>
      </div>
      {/* <div className="bg-blue-300 h-500 flex flex-col items-center justify-center gap-3">
        <MainReviews />
        <WorkshopReviews/>
      </div> */}
    </div>
  );
}
