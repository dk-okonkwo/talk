import { ChatCard } from "@/components/ChatCard";
import { makeChatMessages } from "@/data/chat-data";
import { createFileRoute } from "@tanstack/react-router";
import { chatUsers } from "../_layout";

export const Route = createFileRoute("/chat/_layout/$id")({
  component: ChatBody,
});

function ChatBody() {
  const { id } = Route.useParams();
  return (
    <ChatCard
      initialMessages={makeChatMessages()}
      chatUser={chatUsers[id - 1]}
    />
  );
}
