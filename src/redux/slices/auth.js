import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (params) => {
  const { data } = await axios.post('/api/auth/login', params);
  return data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (params) => {
  const { data } = await axios.post('/api/auth/signup', params);
  return data;
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  const { data } = await axios.get('/api/auth/user');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(loginUser.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(registerUser.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(registerUser.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      })
      .addCase(getUserInfo.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
