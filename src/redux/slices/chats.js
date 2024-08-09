import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const getChats = createAsyncThunk('chats/getChats', async () => {
  const { data } = await axios.get('/api/chats');
  return data;
});

export const deleteChat = createAsyncThunk('chats/deleteChat', async (id) => {
  await axios.delete(`/api/chats/${id}`);
  return id;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.items = null;
        state.status = 'loading';
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'loaded';
      })
      .addCase(getChats.rejected, (state) => {
        state.items = null;
        state.status = 'error';
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
      });
  },
});

export default chatsSlice.reducer;
