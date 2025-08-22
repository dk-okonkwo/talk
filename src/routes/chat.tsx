import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar2 } from "@/components/app-sidebar-2";
import { CardsChat } from "@/components/chat";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/chat")({
  component: TalkChat,
});

function TalkChat() {
  return (
    <div className="w-full h-full overflow-hidden p-1">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
        className="h-full min-h-full overflow-hidden"
      >
        <AppSidebar2 />
        <SidebarInset className="!h-full bg-transparent w-full">
          <CardsChat />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
