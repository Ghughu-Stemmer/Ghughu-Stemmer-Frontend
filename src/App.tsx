import React from "react";
import { Layout } from "antd";
import { CloudOutlined, FileWordOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Sidebar, SideBarMenuItem } from "./layout/Sidebar";
import { DataImporter, DATA_IMPORTER_ROUTE } from "./features/data-importer/DataImporter";
import { WordRecords, WORD_RECORDS_ROUTE } from "./features/word-records/WordRecords";
import "./App.css";
import { MainContent } from "./layout/MainContent";

function App() {
  const appName = "GHUGHU STEMMER";

  const siderMenuItems: SideBarMenuItem[] = [
    {
      key: `${DATA_IMPORTER_ROUTE}-menu-item`,
      icon: <CloudOutlined />,
      label: "Import Data",
      link: DATA_IMPORTER_ROUTE,
    },
    {
      key: `${WORD_RECORDS_ROUTE}-menu-item`,
      icon: <FileWordOutlined />,
      label: "Word Records",
      link: WORD_RECORDS_ROUTE,
    },
  ];

  const footer = <React.Fragment />;

  return (
    <Router>
      <Layout>
        <Sidebar appName={appName} menuItems={siderMenuItems} />
        <MainContent footer={footer}>
          <Switch>
            <Route path="/" exact component={DataImporter} />
            <Route path={DATA_IMPORTER_ROUTE} exact component={DataImporter} />
            <Route path={WORD_RECORDS_ROUTE} exact component={WordRecords} />
          </Switch>
        </MainContent>
      </Layout>
    </Router>
  );
}

export default App;
