import React, { useState } from 'react';
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from "react-redux";
import { selectMessageInput, sendMessage } from '../../features/appSlice';


const ChatInput = ({ channelName, channelId, chatRef }) => {

    // const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const message = useSelector(selectMessageInput);

    const [user] = useAuthState(auth);

    const saveMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        db.collection("rooms").doc(channelId).collection("messages").add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        });

        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        });


        dispatch(sendMessage({
            messageInput: ""
        }));

    }
    return (
        <ChatInputContainer>
            <form>
                <input
                    value={message}
                    onChange={(e) => dispatch(sendMessage({
                        messageInput: e.target.value
                    }))}
                    placeholder={`Message #${channelName}`} />
                <Button hidden type="submit" onClick={saveMessage}>
                    SEND
                </Button>
            </form>

        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        display: flex;
        position: relative;
        justify-content: center;
    }

    > form > input {
        padding:20px;
        position: fixed;
        bottom:30px;
        width: 60%;
        border-radius: 3px;
        outline:none;
        border: 1px solid var(--afritic-border);
        box-shadow:0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)
    }

    > form > button {
        display: none !important;
    }
`;
