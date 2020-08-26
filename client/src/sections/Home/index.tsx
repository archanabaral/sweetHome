import React from "react";
import {useQuery} from "react-apollo"
import { RouteComponentProps, Link } from "react-router-dom";
import {Col, Row, Layout, Typography } from "antd";
import { HomeHero } from "./components";
import mapBackground from "./assets/map-background.jpg";
import sanFransiscoImage from "./assets/san-fransisco.jpg"
import cancunImage from "./assets/cancun.jpg"
import { displayErrorMessage } from "../../lib/utils";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

//the Home component here is rendered as a part of a Route (in app.tsx), any component that is rendered directly as a component of the Route  has access automatically to the object as a prop know as history object (which is reference to the Browser's session history)
export const Home = ({ history }: RouteComponentProps) => {
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      history.push(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero onSearch={onSearch} />
      <div>
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations
        </Paragraph>
        <Link
          to="/listings/united%20states"
          className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
        >
          Popular listings in the United States{" "}
        </Link>
      </div>
      <div>
        <Title level={4} className="home__listings-title">
        Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20fransisco">
            <div className="home__listings-img-cover">
              <img src={sanFransiscoImage} alt="San Fransisco" className="home__listings-img"/>
            </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/cancun">
            <div className="home__listings-img-cover">
              <img src={cancunImage} alt="Cancun" className="home__listings-img"/>
            </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
