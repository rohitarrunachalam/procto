// slices/boolean.js

import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'boolean',
  initialState: {
    value: false,
  },
  reducers: {
    setBoolean: (state, action) => {
      state.value = action.payload; // Set the value to the payload
    },
  },
});

export const { setBoolean } = slice.actions;
export const selectBoolean = (state: { boolean: { value: boolean } }) => state.boolean.value;

export default slice.reducer;
