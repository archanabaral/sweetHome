import { MongoClient } from "mongodb";
import { Database, User, Listing, Booking } from "../lib/types";

const url = `${process.env.MONGO_URI}`;

//our this function is async so we cannot simply specify return type of the value we expect, so we have to say it is going to be promise of return type
export const connectdb = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongo DB connected");

  //retriving a database and assigning to a variabale db
  const db = client.db("main");

  return {
    bookings: db.collection<Booking>("bookings"),
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
  };
};
