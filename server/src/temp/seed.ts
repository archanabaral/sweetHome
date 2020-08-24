import dotenv from "dotenv";
dotenv.config();

import { ObjectId } from "mongodb";
import { connectdb } from "../database";
import { Listing, ListingType, User } from "../lib/types";

const listings: Listing[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    title: "Clean and fully furnished apartment.",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house.jpg",
    host: "5d378db94e84753160e08b56",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b31"),
    title: "Well decorated room",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house1.jpg",
    host: "5d378db94e84753160e08b55",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b32"),
    title: "Good apartment with swmimming pool",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house3.jpg",
    host: "5d378db94e84753160e08b55",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b34"),
    title: "house with good environment",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house2.jpg",
    host: "5d378db94e84753160e08b56",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b35"),
    title: "fully furnished",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house4.jpg",
    host: "5d378db94e84753160e08b56",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b36"),
    title: "well maintained aparment",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image: "./assets/house5.jpg",
    host: "5d378db94e84753160e08b56",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
  },
];
const users: User[] = [
  {
    _id: "5d378db94e84753160e08b55",
    token: "token_************",
    name: "James J.",
    avatar: "./assets/james.jpg",
    contact: "james@tinyhouse.com",
    walletId: "acct_************",
    income: 723796,
    bookings: [],
    listings: [
      new ObjectId("5d378db94e84753160e08b31"),
      new ObjectId("5d378db94e84753160e08b32"),
    ],
  },
  {
    _id: "5d378db94e84753160e08b56",
    token: "token_************",
    name: "Jonathan ",
    avatar: "./assets/johnathan.jpg",
    contact: "jonathon@tinyhouse.com",
    walletId: "acct_************",
    income: 723796,
    bookings: [],
    listings: [
      new ObjectId("5d378db94e84753160e08b30"),
      new ObjectId("5d378db94e84753160e08b34"),
      new ObjectId("5d378db94e84753160e08b35"),
      new ObjectId("5d378db94e84753160e08b36"),
    ],
  },
];

const seed = async () => {
  try {
    console.log(`[seed] : running...`);

    const db = await connectdb();

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }
    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log("[seed]:success");
  } catch (error) {
    throw new Error("failed to seed database");
  }
};

seed();
