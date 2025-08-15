import { createFileRoute } from '@tanstack/react-router'
import { AppSidebar2 } from "@/components/app-sidebar-2";
import { CardsChat } from "@/components/chat";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const Route = createFileRoute('/chat')({
  component: TalkChat,
})

function TalkChat() {
  return (
    <div className="w-full h-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
        className="h-full"
      >
        <AppSidebar2 />
        <SidebarInset className="!h-full bg-main-bg">
          <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto !h-full">
            {/* {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
              />
            ))} */}
            <CardsChat />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
