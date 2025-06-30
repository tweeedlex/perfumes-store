import { configureStore, createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    open: false,
  },
  reducers: {
    toggleOpen: (state) => {
      state.open = !state.open;
    },
  }
});

export const {
  toggleOpen,
} = dataSlice.actions;

const store = configureStore({
  reducer: dataSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;