import { User } from "@/utils/auth";
import { faker } from "@faker-js/faker";
import usrimage from "@/assets/images/usrimg.jpg";
import { formatDistanceToNow } from "date-fns";

const range = (len: number) => {
  const arr: Array<number> = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function getRandomRole() {
  const roles = ["user", "agent"];
  const index = Math.floor(Math.random() * 2);
  return roles[index];
}

export type ChatMessage = {
  id: number;
  role: string;
  content: string;
};

export type LastMessageData = {
  id: number;
  content: string;
  time: string;
};

const newChatUser = (num: number): User => {
  return {
    id: String(num),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    profileImageUrl: usrimage,
    userRole: "Vendor",
  };
};

const newChatMessage = (num: number): ChatMessage => {
  return {
    id: num,
    role: getRandomRole(),
    content: faker.lorem.sentence(),
  };
};

const newLastMessageData = (num: number): LastMessageData => {
  const time = faker.date.recent();
  const relativeTime = formatDistanceToNow(time);
  return {
    id: num,
    content: faker.lorem.sentence(),
    time: relativeTime,
  };
};

// Generates an array our chat users
export function makeChatUsers(count: number): User[] {
  return range(count).map((idx) => newChatUser(idx + 1));
}

// Generates 10 messages per chat
export function makeChatMessages(): ChatMessage[] {
  return range(10).map((idx) => newChatMessage(idx + 1));
}

// Generate last message data for each generated chat user
export function makeLastMessageData(count: number): LastMessageData[] {
  return range(count).map((idx) => newLastMessageData(idx + 1));
}
