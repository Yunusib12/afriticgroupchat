import React from 'react'
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from '../../firebase';

const Login = () => {

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => {
            alert(error.message);
        })
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <h1>Sign in to the Afritic Group Chat</h1>
                <p>chat.afriticgroup.com</p>

                <Button onClick={signIn}>
                    Sign in with Google
            </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login

/* ========= CSS STYLED COMPONENTS ========= */

const LoginContainer = styled.div`
    display: grid;
    place-items:center;
    height: 100vh;
    background: url("assets/images/afritic-group_logo.png") no-repeat 50% 50%;
    background-size: 840px;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    color:var(--afritic-text-wb-color);
    text-align:center;
    border-radius:10px;
    background-color:#ffffff9e;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    > p {
        margin-top:10px;
        font-weight: 500;
        color:var(--afritic-color);
    }

    > button {
        margin-top: 50px;
        padding:11px;
        color: white;
        text-transform: inherit !important;
        background-color: #0c41bd !important;
    }

    > button:hover {
        background-color:var(--afritic-color)!important;
    }
`;