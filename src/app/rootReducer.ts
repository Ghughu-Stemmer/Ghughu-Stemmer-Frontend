import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import dataImporterReducer from "../features/data-importer/dataImporterSlice";
import wordRecordReducer from "../features/word-records/wordRecordSlice";
import appStateReducer from "../features/app-config/appStateSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  dataImporter: dataImporterReducer,
  wordRecords: wordRecordReducer,
  appState: appStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
