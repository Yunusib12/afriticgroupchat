import React from 'react'
import styled from "styled-components";
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Brightness6Icon from '@material-ui/icons/Brightness6';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PoepleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import SidebarOption from "../Sidebar/SidebarOption";
import AddChannel from "../Dialog/AddChannel";
import { useSelector } from "react-redux";
import { selectConfirmShowChannel } from "../../features/appSlice";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
    const [user] = useAuthState(auth);

    const showDialog = useSelector(selectConfirmShowChannel);

    //Getting all the rooms available in the database
    const [channels] = useCollection(db.collection("rooms"));

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

            <SidebarOption Icon={PoepleAltIcon} title="Connected users" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption showDialog={showDialog} title="Add Channel" />

            {
                channels?.docs.map((doc) => (
                    <SidebarOption
                        key={doc.id}
                        id={doc.id}
                        title={doc.data().name} />
                ))
            }


            <AddChannel showDialog={showDialog} />

            <ChatVersion>
                <p>Afritic Group Chat System v1.0.0</p>
            </ChatVersion>

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
    border-top: 1px solid var(--afritic-border);
    background-color: var(--afritic-color);

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid var(--afritic-hr);
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    padding: 13px;
    border-bottom: 1px solid var(--afritic-border);

    > .MuiSvgIcon-root {
        color: #f8f115;
        font-size: 18px;
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
        color: #05e005;
        font-size: 14px;
    }
`;

const ChatVersion = styled.div`
    flex:1;
    position: fixed;
    bottom:10px;
    left: 1.2%;
    
    > p {
        font-family: monospace;
        font-size: 10px;
    }
`;