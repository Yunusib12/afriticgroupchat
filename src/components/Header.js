import React from 'react'
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import useDate from "../time";

const Header = () => {

    const [user] = useAuthState(auth);
    const { date, time, wish } = useDate();

    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar
                    onClick={() => auth.signOut()}
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                <AccessTimeIcon />
                <p>{date}, {time} - {wish}</p>
            </HeaderLeft>

            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

/* ========= CSS STYLED COMPONENTS ========= */

const HeaderContainer = styled.div`
    display: flex;
    position:fixed;
    width:100%;
    align-items:center;
    justify-content:space-between;
    padding: 10px 0;
    color:white;
    background-color: var(--afritic-color);
`;

const HeaderLeft = styled.div`
    display: flex;
    flex: 0.37;
    align-items: center;
    margin-left:20px;

    > .MuiSvgIcon-root{
        margin-right: 10px;
        margin-left:auto;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    background-color:white;

    :hover{
        opacity:0.8;
    }
`;

const HeaderRight = styled.div`
     display: flex;
     flex: 0.3;
     align-items: flex-end;

     > .MuiSvgIcon-root {
         margin-left: auto;
         margin-right: 20px;
     }
`;