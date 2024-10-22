import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ensureUserCreated } from './services/event.service';  // Import the function

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    console.log("Redirect callback, navigating to calendar or default page");
    navigate(appState?.returnTo || '/calendar'); // Redirect to /calendar after login
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        scope: "openid profile email",
        redirect_uri: redirectUri,
      }}
      cacheLocation="localstorage"  // Set cache location to local storage
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
