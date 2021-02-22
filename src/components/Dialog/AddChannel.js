import React from 'react'
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../../firebase';
import styled from "styled-components";
import { addChannelName, showChannel } from "../../features/appSlice";
import { useSelector } from "react-redux";
import { selectChannelName } from "../../features/appSlice";


const AddChanel = ({ showDialog }) => {

    const dispatch = useDispatch();
    const channelName = useSelector(selectChannelName);

    const handleAddChannel = (e) => {
        e.preventDefault();

        //Adding the channel to the database
        if (channelName) {

            db.collection('rooms').add({
                name: channelName
            })
        }

        handleClose();
    }

    const handleClose = () => {

        if (showDialog) {
            dispatch(showChannel({
                confirmShowChannel: false
            }))
        }
    };


    return (
        <DialogContainer>
            <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a Channel</DialogTitle>
                <form>
                    <DialogContent>
                        <DialogContentText>
                            Create another channel based on the Group that you will be communicating with
                            or select the one that interrest you.
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="channelName"
                            label="Channel Name"
                            type="text"
                            fullWidth
                            onChange={(e) => dispatch(addChannelName({
                                channelName: e.target.value
                            }))}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleAddChannel} color="primary" type="submit">Add Channel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </DialogContainer>
    )
}

export default AddChanel

/* ========= CSS STYLED COMPONENTS ========= */

const DialogContainer = styled.div`

`;