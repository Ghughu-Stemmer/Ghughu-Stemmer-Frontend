import React from "react";
import { Steps } from "antd";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import "./DataImporter.module.css";

const { Step } = Steps;

interface StepData {
  title: String;
  description: String;
  icon?: React.ReactNode;
  status: "finish" | "wait" | "process" | "error" | undefined;
}

function getUploadPercentage(
  uploadedRecordsCount: number,
  totalRecordsCount: number
) {
  const uploadPercentage = totalRecordsCount
    ? (uploadedRecordsCount / totalRecordsCount) * 100
    : 100;

  return Math.round((uploadPercentage + Number.EPSILON) * 100) / 100;
}

export function ImportSteps({
  dataImporter: {
    importStarted,
    fetchingData,
    fetchingCompleted,
    uploadingData,
    uploadingCompleted,
    totalRecordsCount,
    uploadedRecordsCount,
    importCompleted,
    importCancelled,
    importError,
  },
}: any) {
  if (!importStarted) {
    return null;
  }

  const uploadPercentage = getUploadPercentage(
    uploadedRecordsCount,
    totalRecordsCount
  );

  let steps: StepData[] = [];

  if (fetchingCompleted) {
    steps.push({
      title: "Completed Fetching Data",
      description: `Fetched ${totalRecordsCount} word records`,
      status: "finish",
    });
  }

  if (uploadingCompleted) {
    steps.push({
      title: "Completed Uploading Records",
      description: `Uploading word records complete`,
      status: "finish",
    });
  }

  if (importCompleted) {
    steps.push({
      title: "Data Import Successful",
      description: `Successfully imported data`,
      status: "finish",
    });
  }

  if (fetchingData) {
    steps.push({
      title: "Fetching Data",
      description: "Fetching word records from import source",
      icon: <LoadingOutlined />,
      status: "process",
    });
  }

  if (uploadingData) {
    steps.push({
      title: `Uploading Records (${uploadPercentage}%)`,
      description: "Fetching word records from import source",
      icon: <LoadingOutlined />,
      status: !importCancelled ? "process" : "error",
    });
  }

  if (importCancelled) {
    steps.push({
      title: `Import Cancelled`,
      description: "",
      icon: <CloseOutlined />,
      status: "error",
    });
  }

  if (importError) {
    steps.push({
      title: `Import Failed`,
      description: `${importError}`,
      icon: <CloseOutlined />,
      status: "error",
    });
  }

  return (
    <Steps direction="vertical">
      {steps.map((step, idx) => (
        <Step
          key={`step-${idx}`}
          title={step.title}
          description={step.description}
          icon={step.icon}
          status={step.status}
        />
      ))}
    </Steps>
  );
}
