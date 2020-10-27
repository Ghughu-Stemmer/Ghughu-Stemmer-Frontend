import React, { CSSProperties, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "antd";
import { selectDataImporter, importDataFromUrl } from "./dataImporterSlice";
import "./DataImporter.module.css";
import { useApolloClient } from "react-apollo";
import { ImportSteps } from "./ImportSteps";


export function DataImporter() {
  const dispatch = useDispatch();

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
    justifyContent: "center",
  };

  return (
    <>
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
          <Button
            key="importDataButton"
            size="large"
            htmlType="submit"
            disabled={loading}
          >
            Import Data
          </Button>
        </div>
      </form>

      <div style={{ width: "40%", margin: 30 }}>
        <ImportSteps dataImporter={dataImporter} />
      </div>
    </>
  );
}
