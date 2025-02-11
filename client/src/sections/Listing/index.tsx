import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Moment } from "moment";
import { LISTING } from "../../lib/graphql/queries/Listing/index";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Layout, Col, Row } from "antd";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";

import {
  ListingDetails,
  BookingDetails,
  ListingCreateBooking,
} from "./components";

interface MatchParams {
  id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 3;

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);

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

  const listingDetailElements = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const BookingsDetailElement = listingBookings ? (
    <BookingDetails
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  const ListingCreateBookingElement = listing ? (
    <ListingCreateBooking
      price={listing.price}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      setCheckInDate={setCheckInDate}
      setCheckOutDate={setCheckOutDate}
    />
  ) : null;

  return (
    <Content className="listings">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailElements}
          {BookingsDetailElement}
        </Col>
        <Col xs={24} lg={10}>
          {ListingCreateBookingElement}
        </Col>
      </Row>
    </Content>
  );
};
