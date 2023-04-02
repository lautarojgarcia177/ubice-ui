/* src/App.js */
import React from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Button,
  Heading,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigationMenu from "./components/menu/NavigationMenu";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <View id="main-container">
          {/* <Heading level={1}>Hello {user.username}</Heading> */}
          <NavigationMenu signOut={signOut} />
          <Outlet />
        </View>
      )}
    </Authenticator>
  );
};
