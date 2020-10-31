import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AppState {
  currentRoute: string;
}

const initialState: AppState = {
  currentRoute: "/",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = appStateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.appConfig.value)`
export const selectAppState = (state: RootState) => state.appState;

export default appStateSlice.reducer;
