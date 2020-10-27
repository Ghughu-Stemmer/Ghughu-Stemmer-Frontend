import React, { CSSProperties, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { selectDataImporter, importDataFromUrl } from "./dataImporterSlice";
import "./DataImporter.module.css";
import { useApolloClient } from "react-apollo";
import { ApolloClient } from "apollo-boost";

const { Step } = Steps;

export function DataImporter() {
  const dispatch = useDispatch();

  const {
    importStarted,
    fetchingData,
    fetchingCompleted,
    uploadingData,
    uploadingCompleted,
    totalRecordsCount,
    uploadedRecordsCount,
    importCompleted,
  } = useSelector(selectDataImporter);

  const [importUrl, setImportUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressSteps, setProgressSteps] = useState<React.ReactNode>();
  const [] = useState<ApolloClient<object>>();

  const client = useApolloClient();

  useEffect(() => {
    setLoading(() => fetchingData || uploadingData);
  }, [fetchingData, uploadingData, setLoading]);

  useEffect(() => {
    if (!importStarted) {
      setProgressSteps("");
      return;
    }

    let stepsArr = [];
    let currentStep = -1;

    if (fetchingData) {
      const step = (
        <Step
          title="Fetching Data"
          status="process"
          description="Fetching word records from import source"
          icon={<LoadingOutlined />}
        />
      );

      stepsArr.push(step);
      currentStep = stepsArr.indexOf(step);
    } else if (fetchingCompleted) {
      stepsArr.push(
        <Step
          title="Completed Fetching Data"
          description={`Fetched ${totalRecordsCount} word records`}
        />
      );
    }

    if (uploadingData) {
      let uploadPercentage = totalRecordsCount
        ? (uploadedRecordsCount / totalRecordsCount) * 100
        : 100;

      uploadPercentage = Math.round((uploadPercentage + Number.EPSILON) * 100) / 100

      const step = (
        <Step
          title={`Uploading Records (${uploadPercentage}%)`}
          description="Fetching word records from import source"
          icon={<LoadingOutlined />}
        />
      );

      stepsArr.push(step);
      currentStep = stepsArr.indexOf(step);
    } else if (uploadingCompleted) {
      stepsArr.push(
        <Step
          title="Completed Uploading Records"
          description={`Uploading word records complete`}
        />
      );
    }

    if (importCompleted) {
      const step = (
        <Step
          title="Data Import Successful"
          description={`Successfully imported data`}
        />
      );

      stepsArr.push(step);
      currentStep = 4; // stepsArr.indexOf(step);
    }

    setProgressSteps(
      <Steps current={currentStep} direction="vertical">
        {stepsArr}
      </Steps>
    );
  }, [
    importStarted,
    fetchingData,
    fetchingCompleted,
    uploadingData,
    uploadingCompleted,
    totalRecordsCount,
    uploadedRecordsCount,
    importCompleted,
    setProgressSteps,
  ]);

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

      <div style={{ width: "50%", margin: 20 }}>{progressSteps}</div>
    </>
  );
}
