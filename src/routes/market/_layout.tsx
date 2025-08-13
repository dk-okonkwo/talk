import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import ResultsOptions from "@/components/resultsOptions";
export const Route = createFileRoute("/market/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const matchRoute = useMatchRoute();
  let currentSubRoute: string = "";
  if (matchRoute({ to: "/market/product" })) currentSubRoute = "Product";
  if (matchRoute({ to: "/market/service" })) currentSubRoute = "Service";
  if (matchRoute({ to: "/market/taka" })) currentSubRoute = "Taka";

  return (
    <div className="">
      {/* <ResultsOptions /> */}
      <Outlet />
    </div>
  );
}
