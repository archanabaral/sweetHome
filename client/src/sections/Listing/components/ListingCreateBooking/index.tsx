import React from "react";
import moment, { Moment } from "moment";
import { DatePicker, Button, Card, Divider, Typography } from "antd";
import { formatListingPrice } from "../../../../lib/utils";

const { Paragraph, Text, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

const disabledDate = (currentDate: Moment) => {
  if (currentDate) {
    const dateBeforeToday = currentDate.isBefore(moment().endOf("day"));
    return dateBeforeToday;
  } else {
    return false;
  }
};

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price, true)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate}
              disabledDate={disabledDate}
              onChange={(dateValue) => setCheckInDate(dateValue)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate}
              disabledDate={disabledDate}
              onChange={(dateValue) => setCheckOutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
