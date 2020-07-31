// import { IResolvers } from "apollo-server-express";
// import { Database , Listing } from "../lib/types";
// import { ObjectId } from "mongodb";

// export const resolvers: IResolvers = {
//   //destructuring {db} from context since in apollo server we have placed database object db in our context so db is available in all our grapgql resolver function
//   //resolver consists 3 arument 1st object 2nd argument and third context
//   Query: {
//     listings: async (
//       _root: undefined,
//       _args: {},
//       { db }: { db: Database }
//     ): Promise<Listing[]> => {
//       return await db.listings.find({}).toArray();
//     },
//   },
//   Mutation: {
//     deleteListing: async (
//       _root: undefined,
//       { id }: { id: string },
//       { db }: { db: Database }
//     ): Promise<Listing> => {
//       const deleteRes = await db.listings.findOneAndDelete({
//         //ObjectId() also accepts the string value to convert it into hexadecimal format
//         _id: new ObjectId(id),
//       });
//       if (!deleteRes.value) {
//         throw new Error("failed to delete listing");
//       }
//       return deleteRes.value;
//     },
//   },
//   //when we query listings at top level it calls the listings resolver function, the listings field return type is Listing object so it follows along and call the resolver within listing object type
//   Listing: {
//     //   //these returend values (return deleteRes.value;return await db.listings.find({}).toArray(); )of the resolver function become the object argument of the children fields and we have a type for these in our type file called Listing so we will import and assign that as a type of obj argument
//     //  title:(obj : Listing) => {obj.title} AND THIS IS HANDLED BY GRAPHQL we should explicitely only define for id
//     id: (obj: Listing):string => obj._id.toString(),
//   },
// };
import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      // eslint-disable-next-line @typescript-eslint/ban-types
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      const data = await db.listings.find({}).toArray();
      console.log(data);
      return data;
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete listing");
      }

      return deleteRes.value;
    },
  },
  Listing: {
    //we want to make id here a string by converting _id from Listing to string because the type of the id field in our listing object type is of graphql id which gets serialized as a string
    id: (listing: Listing): string => listing._id.toString(),
  },
};
