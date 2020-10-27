import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: object[] = [];

export const wordRecordsSlice = createSlice({
  name: "wordRecords",
  initialState,
  reducers: {
    setWordRecords: (state, action: PayloadAction<object[]>) => {
      state = [...action.payload];
      return state;
    },
    clearWordRecords: () => {
      return initialState;
    },
  },
});

export const { setWordRecords, clearWordRecords } = wordRecordsSlice.actions;

export const selectWordRecords = (state: RootState) => state.wordRecords;

export default wordRecordsSlice.reducer;
