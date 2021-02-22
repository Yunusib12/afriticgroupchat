import React, { useRef, useEffect } from 'react';
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from '../../firebase';
import Message from "./Message";
import ChatInput from "./ChatInput";


const Chat = () => {

    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);

    //Get Channel details
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    );

    //Get Channel messages
    const [roomMessages, loading] = useCollection(
        roomId &&
        db
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    //Scrool down to the last message on the chat box
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [roomId, loading])


    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                            </h4>
                            <StarBorderOutlinedIcon />
                        </HeaderLeft>

                        <HeaderRight>
                            <p><HighlightOffIcon /></p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {
                            roomMessages?.docs.map((doc) => {
                                const { id, message, timestamp, user, userImage } = doc.data();

                                return (
                                    <Message
                                        key={id}
                                        message={message}
                                        timestamp={timestamp}
                                        user={user}
                                        userImage={userImage}
                                    />
                                )
                            })
                        }
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    <ChatInput
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                    />
                </>

            )}
        </ChatContainer>
    )
}

export default Chat;

/* ========= CSS STYLED COMPONENTS ========= */

const ChatContainer = styled.div`
    margin-top: 60px;
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
`;

const Header = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display:flex;
        align-items:center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 29px;
        color:#d70000;
        cursor: pointer;
    }
`;

const ChatMessages = styled.div`

`;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
