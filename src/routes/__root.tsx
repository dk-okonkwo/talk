import {
  Outlet,
  createRootRoute,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import AppLayout from "@/components/app-layout";
// import { GlobalProvider } from "@/context/GlobalProvider";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  console.log("pathname:", pathname);
  return (
    <div className="bg-primary w-screen h-screen overflow-hidden relative">
      <div className="q-1 w-[9vw] aspect-square bg-[#B03837] absolute z-3 bottom-0"></div>
      <div className="q-1 w-[13vw] aspect-square bg-[#9E0402] absolute z-2 bottom-0"></div>
      <div className="q-1 w-[17vw] aspect-square bg-[#B70503] absolute z-1 bottom-0"></div>
      <div className="spacer layer absolute h-1/1 aspect-93/80 right-0 z-4"></div>
      {pathname === "/login" ? (
        <div className="z-50 absolute w-screen h-screen">
          <Outlet />
        </div>
      ) : (
        <div className="z-50 absolute w-screen h-screen flex items-center justify-center">
          <AppLayout>
            <Outlet />
          </AppLayout>
        </div>
      )}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="w-full h-32/100 justify-between flex">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col h-full w-1/5 justify-between">
          <Skeleton className="bg-[var(--skeleton-gray)] w-full h-4/7 rounded-sm "></Skeleton>

          <div className="flex items-center h-1/6 gap-2 w-full">
            <Skeleton className="h-full aspect-square rounded-full bg-[var(--skeleton-gray)]"></Skeleton>
            <Skeleton className="bg-[var(--skeleton-gray)] h-6/7 rounded-sm w-full"></Skeleton>
          </div>
          <Skeleton className="bg-[var(--skeleton-gray)] rounded-sm h-1/12"></Skeleton>
          <Skeleton className="bg-[var(--skeleton-gray)] rounded-sm h-1/12"></Skeleton>
        </div>
      ))}
    </div>
  );
}
