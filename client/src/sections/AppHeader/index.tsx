import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import logo from "./assets/logo.jpg";
import { MenuItems } from "./components";

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <div className=".app-header__logo img">
            <Link to="/">
              <img src={logo} alt="App Logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems />
      </div>
    </Header>
  );
};
