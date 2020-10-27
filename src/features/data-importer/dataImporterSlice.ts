import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-boost";

interface DataImporterState {
  importStarted: boolean;
  fetchingData: boolean;
  fetchingCompleted: boolean;
  uploadingData: boolean;
  uploadingCompleted: boolean;
  totalRecordsCount: number;
  uploadedRecordsCount: number;
  importCompleted: boolean;
}

const initialState: DataImporterState = {
  importStarted: false,
  fetchingData: false,
  fetchingCompleted: false,
  uploadingData: false,
  uploadingCompleted: false,
  totalRecordsCount: 0,
  uploadedRecordsCount: 0,
  importCompleted: false,
};

export const dataImporterSlice = createSlice({
  name: "dataImporter",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    startFetchingData: (state) => {
      state.importStarted = true;
      state.fetchingData = true;
    },
    completeFetchingData: (state, action: PayloadAction<number>) => {
      state.totalRecordsCount = action.payload;
      state.fetchingData = false;
      state.fetchingCompleted = true;
    },
    startUploadingData: (state) => {
      state.uploadingData = true;
    },
    addUploadCount: (state, action: PayloadAction<number>) => {
      const uploaded = action.payload;
      state.uploadedRecordsCount += uploaded;
    },
    completeUploadingData: (state) => {
      state.uploadingData = false;
      state.uploadingCompleted = true;
      state.importCompleted = true;
    },
  },
});

const {
  startFetchingData,
  completeFetchingData,
  startUploadingData,
  addUploadCount,
  completeUploadingData,
} = dataImporterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const importDataFromUrl = (
  importUrl: string,
  client: ApolloClient<object>
): AppThunk => async (dispatch) => {
  dispatch(startFetchingData());
  const fetchResponse = await fetch(importUrl);
  const wordRecords = await fetchResponse.json();
  dispatch(completeFetchingData(wordRecords.length));

  const BATCH_SIZE = 500;
  const mutation = gql`
    mutation addManyWords($records: String!) {
      createWordRecordBatch(records: $records) {
        id
        inflectionalWord
        isLastWord
        isVerb
        prefix
        suffix
        stemWord
        targetStemWord
        isAmbiguous
        comment
      }
    }
  `;

  dispatch(startUploadingData());
  for (let i = 0; i < wordRecords.length; i += BATCH_SIZE) {
    const batch = wordRecords
      .slice(i, i + BATCH_SIZE)
      .map((wordRecord: any) => {
        delete wordRecord.id;
        return wordRecord;
      });

    const response = await client.mutate({
      mutation,
      variables: { records: JSON.stringify(batch) },
    });
    console.log(response);
    dispatch(addUploadCount(batch.length));
  }
  dispatch(completeUploadingData());
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.dataImporter.value)`
export const selectDataImporter = (state: RootState) => state.dataImporter;

export default dataImporterSlice.reducer;
