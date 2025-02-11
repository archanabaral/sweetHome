import { gql } from "apollo-boost";

export const LISTINGS = gql`
  query Listings($filter: ListingFilter!, $limit: Int!, $page: Int!) {
    listings(filter: $filter, limit: $limit, page: $page) {
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`;
