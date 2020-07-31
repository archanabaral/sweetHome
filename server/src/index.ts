import dotenv from "dotenv";
dotenv.config();
//though node vastly support es6 features it actually dosenot support import syntax but with TS, it compile a code to valid es6 code that node recognizes i.e with Ts we can use import syntax to import libaries
import express, { Application } from "express";

import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectdb } from "./database";

//creating express server instance by running the express()function and assigning it to vaiable app
// const app = express();

const mount = async (app: Application) => {
  const db = await connectdb();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);
  console.log(`[app]: http://localhost:${process.env.PORT}`);
};

mount(express());
