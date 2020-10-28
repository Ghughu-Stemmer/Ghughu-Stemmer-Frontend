import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-boost";

export interface DataImporterState {
  importStarted: boolean;
  fetchingData: boolean;
  fetchingCompleted: boolean;
  uploadingData: boolean;
  uploadingCompleted: boolean;
  totalRecordsCount: number;
  uploadedRecordsCount: number;
  importCompleted: boolean;
  importCancelled: boolean;
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
  importCancelled: false,
};

const ADD_WORD_RECORD_BATCH_MUTATION = gql`
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

export const dataImporterSlice = createSlice({
  name: "dataImporter",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    startFetchingData: (state) => {
      if (!state.importCancelled) {
        state.importStarted = true;
        state.fetchingData = true;
      }
    },
    completeFetchingData: (state, action: PayloadAction<number>) => {
      state.totalRecordsCount = action.payload;
      state.fetchingData = false;
      state.fetchingCompleted = true;
    },
    startUploadingData: (state) => {
      if (!state.importCancelled) {
        state.uploadingData = true;
      }
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
    cancelDataImporter: (state) => {
      state.importCancelled = true;
      state.fetchingData = false;
      state.uploadingData = false;
    },
    resetDataImporter: () => initialState,
  },
});

export const {
  startFetchingData,
  completeFetchingData,
  startUploadingData,
  addUploadCount,
  completeUploadingData,
  resetDataImporter,
  cancelDataImporter,
} = dataImporterSlice.actions;

export const importDataFromUrl = (
  importUrl: string,
  client: ApolloClient<object>
): AppThunk => async (dispatch, getState) => {
  const controller = new AbortController();
  let importCancelled = false;

  const cancelletionManager = setInterval(() => {
    if (getState().dataImporter.importCancelled) {
      client.stop();
      controller.abort();
      importCancelled = true;
    }
  }, 200);

  dispatch(resetDataImporter());
  dispatch(startFetchingData());

  const fetchResponse = await fetch(importUrl, { signal: controller.signal });
  const wordRecords = await fetchResponse.json();
  if (!importCancelled) {
    dispatch(completeFetchingData(wordRecords.length));
  }

  const BATCH_SIZE = 500;

  if (!importCancelled) {
    dispatch(startUploadingData());
  }

  for (let i = 0; i < wordRecords.length && !importCancelled; i += BATCH_SIZE) {
    const batch = wordRecords
      .slice(i, i + BATCH_SIZE)
      .map((wordRecord: any) => {
        delete wordRecord.id;
        return wordRecord;
      });

    await client.mutate({
      mutation: ADD_WORD_RECORD_BATCH_MUTATION,
      variables: { records: JSON.stringify(batch) },
    });
    dispatch(addUploadCount(batch.length));
  }

  if (!importCancelled) {
    dispatch(completeUploadingData());
  }

  clearInterval(cancelletionManager);
};

export const selectDataImporter = (state: RootState) => state.dataImporter;

export default dataImporterSlice.reducer;
