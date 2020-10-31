import React from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentRoute,
} from "../app-config/appStateSlice";

export const WORD_RECORDS_ROUTE = "/word-records";

export function WordRecords() {
  const dispatch = useDispatch();
  dispatch(setCurrentRoute(WORD_RECORDS_ROUTE));

  return (
    <div>
      Out in the garden one fine day, with my clock I like to play.
    </div>
  );
}
