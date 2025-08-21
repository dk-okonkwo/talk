import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/billboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>hello billboard</div>
  );
}

