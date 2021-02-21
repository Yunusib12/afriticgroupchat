import React from 'react'
import styled from "styled-components";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Brightness6Icon from '@material-ui/icons/Brightness6';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const Sidebar = () => {
    const [user] = useAuthState(auth);


    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>AFRITIC Group - Chat</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <Brightness6Icon />
            </SidebarHeader>

        </SidebarContainer>
    )
}

export default Sidebar;

/* ========= CSS STYLED COMPONENTS ========= */

const SidebarContainer = styled.div`
    flex:0.3;
    margin-top:60px;
    max-width: 260px;
    color:white;
    border-top: 1px solid #d7e7ff;
    background-color: var(--afritic-color);

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #d7e7ff;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    padding: 13px;
    border-bottom: 1px solid #d7e7ff;

    > .MuiSvgIcon-root {
        color: #f8f115;
        font-size: 30px;
        border-radius: 999px;
    }

    > .MuiSvgIcon-root > :hover{
        cursor: pointer;
    }
`;

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: 900px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items:center;
    }

    > h3 > .MuiSvgIcon-root{
        margin-top: 1px;
        margin-right: 2px;
        color: green;
        font-size: 14px;
    }
`;