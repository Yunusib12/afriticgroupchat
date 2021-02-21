import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase';
import Spinner from "react-spinkit";
import styled from "styled-components";
import Login from "./Login/Login";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Chat from './Chat/Chat';

function App() {

  //Getting user information and the page state(loading)
  const [user, loading] = useAuthState(auth);

  //Check if the page is loading 
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="assets/images/afritic-group_logo.png"
            alt="Afritic Group Logo"
          />

          <Spinner
            name="ball-spin-fade-loader"
            color="#1954b9"
            fadeIn="node"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Switch>
                  <Route path="/" exact>
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}
      </Router>
    </>
  );
}

export default App;

/* ========= CSS STYLED COMPONENTS ========= */

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: flex;
  padding-bottom: 100px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    margin-bottom: 40px;
    padding: 20px;
    height: 250px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`