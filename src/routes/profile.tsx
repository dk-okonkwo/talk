import { createFileRoute } from "@tanstack/react-router";
import usr from "../assets/images/usrimg.jpg";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Youtube, Instagram, Facebook } from "iconsax-react";
import ProfilePosts from "@/components/Posts02";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="w-full h-auto flex flex-col md:flex-row md:mt-4 md:gap-2">
      {/* User Info */}
      <div className="flex flex-col md:w-170 xl:w-120">
        <div className="flex items-center py-3 gap-7 sm:gap-8 md:bg-white md:flex-col rounded-sm md:shadow-xs sm:justify-center">
          <ProfileImg img={usr} />
          <div className="flex flex-col gap-4 md:items-center">
            {/* Name and title */}
            <div className="flex flex-col w-fit gap-1 md:items-center">
              <span className="text-[var(--primary)] font-bold text-2xl sm:text-3xl">
                William Smith
              </span>
              <span className="font-bold text-[var(--bg-text)] sm:text-xl">
                UI/UX Designer
              </span>
            </div>
            {/* profile links */}
            <ProfileMenu />
          </div>
        </div>
        {/* About */}
        <div className="w-full flex md:flex-col sm:justify-center gap-4 sm:gap-10 sm:pt-3">
          <div className="min-w-40/100 max-w-70 flex flex-col gap-2 sm:w-50/100 md:w-full md:max-w-full">
            <span className="text-[var(--bg-text)] font-bold pb-0.5 border-b-2 border-b-[var(--primary)] w-fit hidden sm:!block">
              About
            </span>
            <div className="p-1 rounded-sm bg-white mt-2 sm:mt-0 shadow-sm">
              <span className="text-xs w-full sm:text-sm">
                Vintage meets vogue is the only way to describe this serif
                typeface. Neue World encompasses the mode high-fashion aesthetic
                of the 1960s with a commercial take.
              </span>
            </div>
          </div>
          <div className="px-2 sm:px-0">
            <span className="text-[var(--bg-text)] font-bold pb-0.5 border-b-2 border-b-[var(--primary)] hidden sm:!block w-fit">
              Socials
            </span>
            {/* Social links */}
            <div className="mt-2 sm:mt-0 flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
              <div className="flex items-center gap-3 lg:gap-1">
                <Youtube variant="Bold" className="w-6 fill-[var(--primary)]" />
                <span className="text-[15px] text-[var(--bg-text)]">
                  @williamSmith
                </span>
              </div>
              <div className="flex items-center gap-3 lg:gap-1">
                <Instagram
                  variant="Bold"
                  className="w-6 fill-[var(--primary)]"
                />
                <span className="text-[15px] text-[var(--bg-text)]">
                  @williamSmith
                </span>
              </div>
              <div className="flex items-center gap-3 lg:gap-1">
                <Facebook
                  variant="Bold"
                  className="w-6 fill-[var(--primary)]"
                />
                <span className="text-[15px] text-[var(--bg-text)]">
                  @williamSmith
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfilePosts />
    </div>
  );
}

function ProfileImg({ img }: { img: string }) {
  return (
    <div
      className="w-25 aspect-square rounded-full bg-blue-200 sm:w-30 lg:w-40"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></div>
  );
}
