import React, { CSSProperties, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRoute } from "../app-config/appStateSlice";
import { Button, Input } from "antd";
import { useApolloClient } from "react-apollo";
import logo from "../../logo.png";
import { ImportSteps } from "./ImportSteps";
import {
  selectDataImporter,
  importDataFromUrl,
  cancelDataImporter,
} from "./dataImporterSlice";
import "./DataImporter.module.css";

export const DATA_IMPORTER_ROUTE = "/data-importer";

export function DataImporter() {
  const dispatch = useDispatch();
  dispatch(setCurrentRoute(DATA_IMPORTER_ROUTE));

  const dataImporter = useSelector(selectDataImporter);
  const { fetchingData, uploadingData } = dataImporter;

  const [importUrl, setImportUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const client = useApolloClient();

  useEffect(() => {
    setLoading(() => fetchingData || uploadingData);
  }, [fetchingData, uploadingData, setLoading]);

  const formStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    minWidth: "40vw",
    justifyContent: "center",
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <form
        style={formStyle}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(importDataFromUrl(importUrl, client));
        }}
      >
        <div style={formStyle}>
          <Input
            size="large"
            aria-label="URL to import from"
            placeholder="URL to import from"
            name="inputUrl"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            required
          />

          {!loading && (
            <Button key="importDataButton" size="large" htmlType="submit">
              Import Data
            </Button>
          )}

          {loading && (
            <Button
              danger
              type="primary"
              key="cancelImportButton"
              size="large"
              htmlType="button"
              onClick={() => dispatch(cancelDataImporter())}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div style={{ width: "40%", height: "30%", margin: 30 }}>
        <ImportSteps dataImporter={dataImporter} />
      </div>
    </header>
  );
}
