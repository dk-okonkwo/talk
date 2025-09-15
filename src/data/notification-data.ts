import { faker } from "@faker-js/faker";
import head from "../assets/images/headshot.jpg";
import sh1 from "../assets/images/itemImages/shoes_1.jpg";
import sh2 from "../assets/images/itemImages/shoes_2.jpg";
import sh3 from "../assets/images/itemImages/shoes_3.jpg";
import sh4 from "../assets/images/itemImages/shoes_4.jpg";
import sh5 from "../assets/images/itemImages/shoes_5.jpg";
import svimg from "../assets/images/saved.png";
import headshot from "../assets/images/headshot.jpg";
import bmw1 from "../assets/images/bmw1.jpeg";
import bmw2 from "../assets/images/bmw2.jpg";
import greybm from "../assets/images/greybm.jpeg";

const notifImgs = [
  sh1,
  sh2,
  sh3,
  sh4,
  sh5,
  svimg,
  bmw1,
  bmw2,
  greybm,
  headshot,
  head,
];

export type UserNotification = {
  id: number;
  name: string;
  imgUrl: string;
  linkUrl: string;
};

// simple range helper
const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// generate a single product
const newNotification = (id: number): UserNotification => {
  const img = notifImgs[Math.floor(Math.random() * notifImgs.length)];
  const randNum = Math.floor(Math.random() * 12) + 1;

  return {
    id,
    name: faker.lorem.sentence(3),
    imgUrl: img,
    linkUrl: `chat/${randNum}`,
  };
};

/**
 * Generate an array of Notification object
 * @param count number of nofitications to create
 */
export function makeNotifications(count: number): UserNotification[] {
  return range(count).map((idx) => newNotification(idx + 1));
}
