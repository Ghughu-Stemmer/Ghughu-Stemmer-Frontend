import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import dataImporterReducer from "../features/data-importer/dataImporterSlice";
import wordRecordReducer from "../features/word-records/wordRecordSlice";
import appConfigReducer from "../features/app-config/appConfigSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  dataImporter: dataImporterReducer,
  wordRecords: wordRecordReducer,
  appConfig: appConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
