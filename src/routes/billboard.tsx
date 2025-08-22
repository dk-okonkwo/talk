import { createFileRoute } from "@tanstack/react-router";
import { BillTabs } from "@/components/BillTabs";

export const Route = createFileRoute("/billboard")({
  component: Billboard,
});

function Billboard() {
  return (
    <div className="flex justify-center mt-4">
      <BillTabs />
    </div>
  );
}
