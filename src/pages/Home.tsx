import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";

import EventBanner from "@/components/EventBanner";
import { Search } from "lucide-react";


function Home() {
  return (
    <div className="flex">
      <div className="relative flex-1 bg-talkBG h-[92vh] lg:h-full overflow-auto">
        <main className="px-4 py-2 space-y-4">
          <div className=" flex lg:hidden px-2 items-center py-1 bg-[#EDEFF2] border focus-within:border-black/50 rounded-sm text-sm">
            <Search className="opacity-50" />
            <Input placeholder="Search..." />
          </div>
          <div className="space-y-4 max-w-lg mx-auto">
            <EventBanner />
            <h1 className="text-lg font-medium tracking-wide">Updates</h1>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home