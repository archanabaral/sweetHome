import React, { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Card, Layout, Typography } from "antd";
import { Viewer } from "../../lib/types";
import { LOG_IN } from "../../lib/graphql/mutations/login/index";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/login/__generated__/LogIn";
import { AUTH_URL } from "../../lib/graphql/queries/AuthUrl/index";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
//image assets
import googleLogo from "./assests/google.png";

const { Content } = Layout;
const { Text, Title } = Typography;

//setViewer is a prop it will receive , setviewer is a function that will receive a viewer object  with which it is going to use to update the viewer state property
interface Props {
  setViewer: (viewer: Viewer) => void;
}
export const Login = ({ setViewer }: Props) => {
  //we are not using useQuery hook to send query req because it runs a query upon component mount but here req is to be made only when the button is clicked so we use useApolloClient hook which allows direct access to apolloclient object
  const client = useApolloClient();

  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN);
 
  //useRef return object with current property
  const logInRef = useRef(logIn);
//login will not be dependency since login function is instanciated within the component and if the component ever re-render the new version of login function will be established which may cause our useeffect hook to run again so we use useref hook and now this logInRef.current will refrence the original function regardless of how many render happens 
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: { input: { code } },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });

      window.location.href = data.authUrl;
    } catch {}
  };
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            Log in to SweetHome!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in , you'll be redirected to the Google consent form
          to sign in with your google account.{" "}
        </Text>
      </Card>
    </Content>
  );
};
