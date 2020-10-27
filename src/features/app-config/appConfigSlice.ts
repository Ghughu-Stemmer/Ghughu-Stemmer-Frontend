import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AppConfigState {
  
}

const initialState: AppConfigState = {
  
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    
  },
});


export const {} = appConfigSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.appConfig.value)`
export const selectAppConfig = (state: RootState) => state.appConfig;

export default appConfigSlice.reducer;
