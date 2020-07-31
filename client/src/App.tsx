import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Home, Host, Listing, NotFound, User, Listings } from "./sections";

//creating a apollo client with ApolloClient constructor and passing in the uri of our graphql api
const client = new ApolloClient({
  uri: "/api",
});

//connect our apollo client with react application this is done by ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location" component={Listings} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;

//boost package is the configuration package that contains everything we need to setup an apollo client , react-apollo is a view layer to be used in react to help interact with the graphql API and graphql is needed to help parse our graphql document
