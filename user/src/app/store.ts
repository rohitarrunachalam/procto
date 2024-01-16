// store.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../example/components/counterSlice';
import booleanReducer from '../example/components/Exam/submitSlice';

const rootReducer = {
  counter: counterReducer,
  boolean: booleanReducer,
};

export default configureStore({
  reducer: rootReducer,
});
