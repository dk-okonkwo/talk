import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Youtube, Instagram, Facebook, PenAdd } from "iconsax-react";
import ProfilePosts from "@/components/Posts02";
import { useAuth } from "@/utils/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/profile/$id")({
  component: Profile,
});

function Profile() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const profileId = pathname.split("/").pop();

  const { user } = useAuth();

  const isUserAccount = profileId == user?.id;
  if (user)
    return (
      <div className="w-full h-auto flex flex-col md:flex-row md:mt-4 md:gap-2">
        {/* User Info */}
        <div className="flex flex-col md:w-170 xl:w-120">
          <div className="flex items-center py-3 gap-7 sm:gap-8 md:bg-white md:flex-col rounded-sm md:shadow-xs sm:justify-center">
            <div className="relative">
              {user && user.profileImageUrl ? (
                <ProfileImg img={user.profileImageUrl} />
              ) : (
                <DefaultProfileImg />
              )}
              {isUserAccount && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="!p-3 rounded-full aspect-square max-h-fit max-w-fit absolute bottom-0 right-0 hover:scale-110 min-w-fit min-h-fit"
                      >
                        <PenAdd className="stroke-primary !w-4 sm:!w-5 !h-4 sm:!h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change Profile Photo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <div className="flex flex-col gap-4 md:items-center">
              {/* Name and title */}
              <div className="flex flex-col w-fit gap-2 md:items-center">
                <div className="flex items-center gap-1">
                  <span className="text-[var(--primary)] font-bold text-2xl sm:text-3xl">
                    {user.first_name} {user.last_name} username
                  </span>
                  {isUserAccount && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="!p-2 rounded-full aspect-square max-h-fit max-w-fit hover:scale-110 min-w-fit min-h-fit"
                          >
                            <PenAdd className="stroke-primary !w-4 sm:!w-5 !h-4 sm:!h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Update Username</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-bold text-[var(--bg-text)] sm:text-xl">
                    UI/UX Designer
                  </span>
                  {isUserAccount && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="!p-2 rounded-full aspect-square max-h-fit max-w-fit hover:scale-110 min-w-fit min-h-fit"
                          >
                            <PenAdd className="stroke-primary !w-4 sm:!w-5 !h-4 sm:!h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Update Title</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              {/* profile links */}
              <ProfileMenu profileId={profileId ?? ""} />
            </div>
          </div>
          {/* About */}
          <div className="w-full flex md:flex-col sm:justify-center gap-4 sm:gap-10 sm:pt-3">
            <div className="min-w-40/100 max-w-70 flex flex-col gap-2 sm:w-50/100 md:w-full md:max-w-full">
              <div className="flex items-center gap-2">
                <span className="text-[var(--bg-text)] font-bold pb-0.5 border-b-2 border-b-[var(--primary)] w-fit">
                  About
                </span>
                {isUserAccount && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="!p-2 rounded-full aspect-square max-h-fit max-w-fit hover:scale-110 min-w-fit min-h-fit"
                        >
                          <PenAdd className="stroke-primary !w-4 sm:!w-5 !h-4 sm:!h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update About Bio</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="p-1 rounded-sm bg-white mt-2 sm:mt-0 shadow-sm">
                <span className="text-xs w-full sm:text-sm">
                  Vintage meets vogue is the only way to describe this serif
                  typeface. Neue World encompasses the mode high-fashion
                  aesthetic of the 1960s with a commercial take.
                </span>
              </div>
            </div>
            <div className="px-2 sm:px-0">
              <div className="flex items-center gap-2">
                <span className="text-[var(--bg-text)] font-bold pb-0.5 border-b-2 border-b-[var(--primary)] w-fit">
                  Socials
                </span>
                {isUserAccount && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="!p-2 rounded-full aspect-square max-h-fit max-w-fit hover:scale-110"
                        >
                          <PenAdd className="stroke-primary !w-4 sm:!w-5 !h-4 sm:!h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update links</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              {/* Social links */}
              <div className="mt-2 sm:mt-0 flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
                <div className="flex items-center gap-3 lg:gap-1">
                  <Youtube
                    variant="Bold"
                    className="w-6 fill-[var(--primary)]"
                  />
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
        <ProfilePosts isUserAccount={isUserAccount} />
      </div>
    );
  else return <div>nothing</div>;
}

function ProfileImg({ img }: { img: string | undefined }) {
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

function DefaultProfileImg() {
  const [colors, setColors] = useState<string[]>([]);

  function getRandomColors(count: number = 3): string[] {
    return Array.from({ length: count }, () => {
      const rnd = Math.floor(Math.random() * 16777215);
      return `#${rnd.toString(16).padStart(6, "0")}`.toUpperCase();
    });
  }

  useEffect(() => {
    setColors(getRandomColors(3));
  }, []);

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className="w-25 sm:w-30 lg:w-40"
    >
      <circle fill={colors[0]} cx="256" cy="256" r="256" />
      <g>
        <rect x="113.424" y="376" fill={colors[2]} width="285.144" height="8" />
        <rect x="157.296" y="400" fill={colors[2]} width="197.408" height="8" />
      </g>
      <circle fill={colors[2]} cx="256" cy="144.24" r="50.776" />
      <path
        fill={colors[1]}
        d="M343.584,307.552c0,0,0,2.368,0-44.944s-51.64-48.176-51.64-48.176h-71.888
       c0,0-51.64,0.576-51.64,48.176c0,47.312,0,44.944,0,44.944H343.584z"
      />
    </svg>
  );
}
