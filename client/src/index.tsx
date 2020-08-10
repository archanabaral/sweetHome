import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Operation from "antd/lib/transfer/operation";

//creating a apollo client with ApolloClient constructor and passing in the uri of our graphql api
const client = new ApolloClient({
  uri: "/api",
  request: async (operation) => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || "",
      },
    });
  },
});
//connect our apollo client with react application this is done by ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />/
  </ApolloProvider>,
  document.getElementById("root")
);
