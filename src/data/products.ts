import head from "../assets/images/headshot.jpg";
import sh1 from "../assets/images/itemImages/shoes_1.jpg";
import sh2 from "../assets/images/itemImages/shoes_2.jpg";
import sh3 from "../assets/images/itemImages/shoes_3.jpg";
import sh4 from "../assets/images/itemImages/shoes_4.jpg";
import sh5 from "../assets/images/itemImages/shoes_5.jpg";

export interface takaItem {
  id: number;
  imgUrls: string[];
  name: string;
  owner: string[];
  price: number;
  discount: number;
  rating: number;
}

const shoes = [sh1, sh2, sh3, sh4, sh5];
const itemOwner = ["Joseph Smith", head];

export const takaItems: takaItem[] = [
  {
    id: 1,
    imgUrls: shoes,
    name: "Them Shoes 3000",
    owner: itemOwner,
    price: 25000,
    discount: 30,
    rating: 45,
  },
  {
    id: 2,
    imgUrls: shoes,
    name: "Them Shoes 3001",
    owner: itemOwner,
    price: 25000,
    discount: 0,
    rating: 45,
  },
  {
    id: 3,
    imgUrls: shoes,
    name: "Them Shoes 3002",
    owner: itemOwner,
    price: 30000,
    discount: 15,
    rating: 45,
  },
  {
    id: 4,
    imgUrls: shoes,
    name: "Them Shoes 3003",
    owner: itemOwner,
    price: 2500,
    discount: 10,
    rating: 45,
  },
  {
    id: 5,
    imgUrls: shoes,
    name: "Them Shoes 3004",
    owner: itemOwner,
    price: 25000,
    discount: 20,
    rating: 45,
  },
  {
    id: 6,
    imgUrls: shoes,
    name: "Them Shoes 3005",
    owner: itemOwner,
    price: 25000,
    discount: 0,
    rating: 45,
  },
];
