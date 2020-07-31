import { ObjectId, Collection } from "mongodb";

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
    //Collection is a generic and accepts a typed variable  adding listing interface we have created as a typed parameter of this collection interface
  listings: Collection<Listing>;
}


