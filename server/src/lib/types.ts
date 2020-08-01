import { ObjectId, Collection } from "mongodb";

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest?: boolean;
}
export interface Booking {
  _id: ObjectId;
  listing: ObjectId; //one-one
  tenant: string; //one-one with user
  checkIn: string;
  checkOut: string;
}

export enum ListingType {
  Apartment = "APARTMENT", //seting Apartment property with a string value of "APARTMENT"
  House = "HOUSE",
}
export interface BookingsIndexMonth {
  [key: string]: boolean;
}
export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}
export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}
export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string; //or owner //one to one
  type: ListingType;
  address: string;
  admin: string;
  country: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  numOfStars: number;
  numOfVotes: number;
  rating: number;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string; //to store user payments detail it will be of type string or undefine
  income: number;
  bookings: ObjectId[]; //one user has many bookings one to many relation
  listings: ObjectId[]; //same
}
export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
