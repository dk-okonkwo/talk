import { faker } from "@faker-js/faker";
import head from "../assets/images/headshot.jpg";
import sh1 from "../assets/images/itemImages/shoes_1.jpg";
import sh2 from "../assets/images/itemImages/shoes_2.jpg";
import sh3 from "../assets/images/itemImages/shoes_3.jpg";
import sh4 from "../assets/images/itemImages/shoes_4.jpg";
import sh5 from "../assets/images/itemImages/shoes_5.jpg";

const shoes = [sh1, sh2, sh3, sh4, sh5];

export interface productItem {
  id: number;
  imgUrls: string[];
  name: string;
  owner: string[]; // [ ownerName, ownerImage ]
  price: number;
  discount: number;
  rating: number;
}

// simple range helper
const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// generate a single product
const newProduct = (id: number): productItem => {
  // pick 1–3 unique images
  const imgs = faker.helpers
    .shuffle(shoes)
    .slice(0, faker.number.int({ min: 1, max: 3 }));

  // always use head for the image, but randomize the name
  const ownerName = `${faker.person.firstName()} ${faker.person.lastName()}`;

  return {
    id,
    imgUrls: imgs,
    name: faker.commerce.productName(),
    owner: [ownerName, head],
    price: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
    discount: faker.number.int({ min: 0, max: 50 }),
    rating: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
  };
};

/**
 * Generate an array of productItem objects.
 * @param count number of products to create
 */
export function makeProducts(count: number): productItem[] {
  return range(count).map((idx) => newProduct(idx + 1));
}
