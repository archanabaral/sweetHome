import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../lib/graphql/queries/Listing/index";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Layout } from "antd";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";

interface MatchParams {
  id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 3;

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1);
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );
  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }
  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This Listing may not exist or we've encountered an error.Please try again soon!" />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  return <h1>Listing</h1>;
};
