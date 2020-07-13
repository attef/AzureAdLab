import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AzureAD, AuthenticationState} from "react-aad-msal";
import {authProvider} from "./authProvider";
import { HomePage } from "./HomePage";
function App() {
  return (
    <AzureAD provider={authProvider}>
      {
        ({login, logout, authenticationState, accountInfo, error}) => {
          switch(authenticationState){
            case AuthenticationState.Unauthenticated : 
              return <button onClick={login}>Sign In</button>;
            case AuthenticationState.InProgress:
              return <p>Authentication in progress ...</p>;
            case AuthenticationState.Authenticated:
              return <HomePage userName={accountInfo.account.name} logout={logout} />;
                
          }

        }
      }
    </AzureAD>
  );
}

export default App;
