import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { enterRoom, showChannel } from '../../features/appSlice';

const SidebarOption = ({ Icon, title, addChannelOption, id, showDialog }) => {

    const dispatch = useDispatch();

    //Update dialog state
    const addChannel = () => {

        if (!showDialog) {
            dispatch(showChannel({
                confirmShowChannel: true
            }))
        }

    };

    //Update roomdId
    const selectChannel = () => {

        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    };


    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >

            {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                    <SidebarOptionChannel>
                        <span>#</span> {title}
                    </SidebarOptionChannel>
                )}

        </SidebarOptionContainer>
    )
}

export default SidebarOption;

/* ========= CSS STYLED COMPONENTS ========= */

const SidebarOptionContainer = styled.div`
    display: flex;
    padding-left: 2px;
    font-size: 12px;
    align-items: center;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: var(--afritic-hover);
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;