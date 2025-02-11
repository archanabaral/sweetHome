/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilter } from "../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface Listings_listings {
  __typename: "Listings";
  result: Listings_listings_result[];
}

export interface Listings {
  listings: Listings_listings;
}

export interface ListingsVariables {
  filter: ListingFilter;
  limit: number;
  page: number;
}
