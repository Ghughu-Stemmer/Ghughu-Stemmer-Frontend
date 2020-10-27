import React, { CSSProperties } from "react";
import { Layout } from "antd";

const { Content, Footer } = Layout;

type MainContentProps = {
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export const MainContent = ({
  footer = <React.Fragment />,
  children = <React.Fragment />,
}: MainContentProps) => {
  
  const rootLayoutStyle: CSSProperties = {
    marginLeft: 200,
    backgroundColor: "white",
    display: "flex",
    flexFlow: "column",
    height: "100vh",
  };

  const contentStyle: CSSProperties = {
    margin: "24px 16px 0",
    overflow: "initial",
    backgroundColor: "white",
    flex: "1 1 auto",
  };

  const appDivStyle: CSSProperties = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const footerStyle: CSSProperties = {
    textAlign: "center",
    backgroundColor: "white",
    flex: "0 1 40px",
  };

  return (
    <Layout className="site-layout" style={rootLayoutStyle}>
      <Content style={contentStyle}>
        <div className="App" style={appDivStyle}>
          {children}
        </div>
      </Content>
      <Footer style={footerStyle}>{footer}</Footer>
    </Layout>
  );
};
