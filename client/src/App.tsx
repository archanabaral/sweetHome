import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Layout, Affix } from "antd";
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

//creating a apollo client with ApolloClient constructor and passing in the uri of our graphql api
const client = new ApolloClient({
  uri: "/api",
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

//connect our apollo client with react application this is done by ApolloProvider
function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  console.log(viewer);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout id="app">
          <Affix offsetTop={0} className="app__affix-header">
            <AppHeader />
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
    </ApolloProvider>
  );
}

export default App;

//boost package is the configuration package that contains everything we need to setup an apollo client , react-apollo is a view layer to be used in react to help interact with the graphql API and graphql is needed to help parse our graphql document
