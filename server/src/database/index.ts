import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `${process.env.MONGO_URI}`

//our this function is async so we cannot simply specify return type of the value we expect, so we have to say it is going to be promise of return type
export const connectdb = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongo DB connected");

  //retriving adatabase and assigning to a variabale db
  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
