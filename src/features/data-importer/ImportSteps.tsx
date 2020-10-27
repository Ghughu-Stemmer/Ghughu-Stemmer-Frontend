import React from "react";
import { Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./DataImporter.module.css";

const { Step } = Steps;

function getUploadPercentage(
  uploadedRecordsCount: number,
  totalRecordsCount: number
) {
  const uploadPercentage = totalRecordsCount
    ? (uploadedRecordsCount / totalRecordsCount) * 100
    : 100;

  return Math.round((uploadPercentage + Number.EPSILON) * 100) / 100;
}

export function ImportSteps({ dataImporter }: any) {
  const {
    importStarted,
    fetchingData,
    fetchingCompleted,
    uploadingData,
    uploadingCompleted,
    totalRecordsCount,
    uploadedRecordsCount,
    importCompleted,
  } = dataImporter;

  if (!importStarted) {
    return null;
  }

  const uploadPercentage = getUploadPercentage(
    uploadedRecordsCount,
    totalRecordsCount
  );

  let currentPos = 3;
  if (fetchingData) {
    currentPos = 0;
  }
  if (uploadingData) {
    currentPos = 1;
  }

  return (
    <Steps current={currentPos} direction="vertical">
      {fetchingCompleted && (
        <Step
          title="Completed Fetching Data"
          description={`Fetched ${totalRecordsCount} word records`}
        />
      )}

      {uploadingCompleted && (
        <Step
          title="Completed Uploading Records"
          description={`Uploading word records complete`}
        />
      )}

      {importCompleted && (
        <Step
          title="Data Import Successful"
          description={`Successfully imported data`}
        />
      )}

      {fetchingData && (
        <Step
          title="Fetching Data"
          status="process"
          description="Fetching word records from import source"
          icon={<LoadingOutlined />}
        />
      )}

      {uploadingData && (
        <Step
          title={`Uploading Records (${uploadPercentage}%)`}
          description="Fetching word records from import source"
          icon={<LoadingOutlined />}
        />
      )}
    </Steps>
  );
}
