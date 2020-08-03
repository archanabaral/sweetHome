import { google } from "googleapis";

//To ask for permission from a user to retrive an access token , redirect them to a consent page.To create consent page url follow followings
//Once a user has given permissions on the consent page, Google will redirect the page to the redirect URL we have provided with a code query parameter.

//first configure new auth object with clientid clientsecret and redirect url

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

//in Scope we define the Url what we are intrested in i.e user email and profile
//Now this is all we need for authentication Url being generated
export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: "online",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
  //function to obtain user's token
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code); //auth object we created has getToken function that accepts code and creates an http request to google server to obtain users tokens (this will provide an object with access_token and refresh_token )

    auth.setCredentials(tokens); //for configuring auth object

    //now we use configured auth object to make a request to people api to get the user information
    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAddresses, names, photos",
    });
    return { user: data };
  },
};
