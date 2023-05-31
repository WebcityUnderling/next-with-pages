import { configureStore } from '@reduxjs/toolkit';
import careersReducer from '@/store/careersSlice';

export default configureStore({
  reducer: {
    careers: careersReducer,
  },
});