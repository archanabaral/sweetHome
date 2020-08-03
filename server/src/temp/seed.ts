import dotenv from "dotenv";
dotenv.config();

import { ObjectId } from "mongodb";
import { connectdb } from "../database";
import { Listing ,ListingType , User} from "../lib/types";

const listings: Listing[] = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    title: "Clean and fully furnished apartment. 5 min away from CN Tower",
    description:
      "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower.",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/...",
    host: "5d378db94e84753160e08b57",
    type: ListingType.Apartment,
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    country: "Canada",
    admin: "Ontario",
    city: "Toronto",
    bookings: [],
    bookingsIndex: {},
    price: 12424,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 1,
    numOfStars: 768,
    numOfVotes: 768,
    rating: 1
  }
  
];
const users: User[] = [
  {
    _id: "5d378db94e84753160e08b55",
    token: "token_************",
    name: "James J.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/...",
    contact: "james@tinyhouse.com",
    walletId: "acct_************",
    income: 723796,
    bookings: [],
    listings: [
      new ObjectId("5d378db94e84753160e08b31"),
      new ObjectId("5d378db94e84753160e08b4b"),
      new ObjectId("5d378db94e84753160e08b4c")
    ]
  }
  
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
