import React from "react";
import logo from "./logo.svg";
import { Layout } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Sidebar, SideBarMenuItem } from "./layout/Sidebar";
import { DataImporter } from "./features/data-importer/DataImporter";
import "./App.css";
import { MainContent } from "./layout/MainContent";

const { Text, Link } = Typography;

function App() {
  const appName = "GHUGHU STEMMER";

  const siderMenuItems: SideBarMenuItem[] = [
    {
      id: "dataImportMenuItem",
      icon: <CloudOutlined />,
      label: "Import Data",
    },
  ];

  const footer = (
    <Text disabled>
      Icons made by{" "}
      <Link type="secondary" href="https://smashicons.com/" title="Smashicons">
        Smashicons
      </Link>{" "}
      from{" "}
      <Link type="secondary" href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </Link>
    </Text>
  );

  return (
    <Layout>
      <Sidebar appName={appName} menuItems={siderMenuItems} />
      <MainContent footer={footer}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DataImporter />
        </header>
      </MainContent>
    </Layout>
  );
}

export default App;
