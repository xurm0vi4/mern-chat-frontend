import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import chats from './slices/chats';

export const store = configureStore({
  reducer: {
    auth,
    chats,
  },
});
