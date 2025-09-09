import { faker } from "@faker-js/faker";
import sh1 from "../assets/images/itemImages/shoes_1.jpg";
import sh2 from "../assets/images/itemImages/shoes_2.jpg";
import sh3 from "../assets/images/itemImages/shoes_3.jpg";
import sh4 from "../assets/images/itemImages/shoes_4.jpg";
import sh5 from "../assets/images/itemImages/shoes_5.jpg";
import svimg from "../assets/images/saved.png";
import bmw1 from "../assets/images/bmw1.jpeg";
import bmw2 from "../assets/images/bmw2.jpg";
import greybm from "../assets/images/greybm.jpeg";

const savedImgs = [sh1, sh2, sh3, sh4, sh5, svimg, bmw1, bmw2, greybm];

export type SavedItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  itemType: string;
  isAvailable: boolean;
  vendorId: number;
};

const routes = ["/market/products/", "/market/taka/", "/market/services/"];

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newSavedData = (id: number): SavedItem => {
  const img = savedImgs[Math.floor(Math.random() * savedImgs.length)];
  const randNum = Math.floor(Math.random() * 12) + 1;

  return {
    id,
    name: faker.lorem.sentence(4),
    price: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    imgUrl: img,
    isAvailable: randNum % 2 == 0,
    itemType: routes[randNum % 3],
    vendorId: randNum,
  };
};

/**
 * Generate an array of saved objects
 * @param count number of saved objects to create
 */
export function makeSavedData(count: number): SavedItem[] {
  return range(count).map((idx) => newSavedData(idx + 1));
}
