import { gql } from "apollo-server-express";

//didRequest field to indicate if we have already atempted to obtain viewer info

export const typeDefs = gql`
  enum ListingType {
    APARTMENT
    HOUSE
  }
  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType!
    address: String!
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
  }

  type Booking {
    id: ID!
    listing: Listing!
    tenent: User!
    checkIn: String!
    checkOut: String!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }
  type Bookings {
    total: Int!
    result: [Booking!]!
  }
  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  input LogInInput {
    code: String!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;
