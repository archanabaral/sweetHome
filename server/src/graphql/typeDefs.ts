import { gql } from "apollo-server-express";

//didRequest field to indicate if we have already atempted to obtain viewer info
export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
  type Query {
    authUrl: String
  }

  # type Input {
  #   code: String!
  # }

  type Mutation {
    logIn(code: String): Viewer!
    logOut: Viewer!
  }
`;
