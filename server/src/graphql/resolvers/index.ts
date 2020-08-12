import merge from "lodash.merge";
import { userResolver } from "./User";
import { viewerResolvers } from "./Viewer";
import { listingResolvers } from "./Listing";
export const resolvers = merge(viewerResolvers, userResolver, listingResolvers);
