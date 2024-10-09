import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './errorSlice';
import createPostSlice from "../redux/postSilce"

const store = configureStore({
  reducer: {
    errors: errorReducer,
    createPostSlice: createPostSlice,
  },
});

export default store;