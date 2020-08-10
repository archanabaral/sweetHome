import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useMutation } from "react-apollo";
import { Layout, Affix, Spin } from "antd";
import {
  AppHeader,
  Home,
  Host,
  Listing,
  NotFound,
  User,
  Listings,
  Login,
} from "./sections";
import { Viewer } from "./lib/types";
import { LOG_IN } from "./lib/graphql/mutations/login";
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/login/__generated__/LogIn";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  console.log(viewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
  });
  const logInRef = useRef(logIn);
  useEffect(() => {
    logInRef.current();
  }, []);

  //didRequest field is only set to true if user manages to login successfully or unsuccessfully
  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching SweetHome" />
        </div>
      </Layout>
    );
  }
  const logInError = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in, Please try again later!" />
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInError}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location" component={Listings} />
          <Route exact path="/user/:id" component={User} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

//boost package is the configuration package that contains everything we need to setup an apollo client , react-apollo is a view layer to be used in react to help interact with the graphql API and graphql is needed to help parse our graphql document
