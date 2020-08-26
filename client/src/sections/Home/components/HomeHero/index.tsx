import React from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import torontoImage from "../../assets/toronto.jpg";
import dubaiImage from "../../assets/dubai.jpg";
import losAngelesImage from "../../assets/los-angeles.jpg";
import londonImage from "../../assets/london.jpg";

const { Title } = Typography;
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">
          Find a place you'll love to stay at
        </Title>
        <Search
          placeholder="Search city"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        ></Search>
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to="/listings/toronto">
            <Card cover={<img src={torontoImage} />}>Toronto</Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/listings/dubai">
            <Card cover={<img src={dubaiImage} />}>Dubai</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/los%20Angels">
            <Card cover={<img src={losAngelesImage} />}>Los Angeles</Card>
          </Link>
        </Col>

        <Col xs={0} md={6}>
          <Link to="/listings/london">
            <Card cover={<img src={londonImage} />}>London</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
