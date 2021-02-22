import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    confirmShowChannel: false,
    channelName: null,
    messageInput: null
  },
  reducers: { //creacting action start here
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    showChannel: (state, action) => {
      state.confirmShowChannel = action.payload.confirmShowChannel;
    },
    addChannelName: (state, action) => {
      state.channelName = action.payload.channelName;
    },
    sendMessage: (state, action) => {
      state.messageInput = action.payload.messageInput;
    }
  },
});

export const { enterRoom, showChannel, addChannelName, sendMessage } = appSlice.actions;

//Retrieve datas from the store
export const selectRoomId = state => state.app.roomId;
export const selectConfirmShowChannel = state => state.app.confirmShowChannel;

export const selectChannelName = state => state.app.channelName;
export const selectMessageInput = state => state.app.messageInput;

export default appSlice.reducer;
