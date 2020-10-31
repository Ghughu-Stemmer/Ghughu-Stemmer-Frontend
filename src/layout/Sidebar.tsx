import React from "react";
import { useSelector } from "react-redux";
import {
  selectAppState,
} from "../features/app-config/appStateSlice";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export interface SideBarMenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  link: string;
}

type SidebarProps = {
  appName: string;
  menuItems: SideBarMenuItem[];
  appRootUrl?: string;
};

export function Sidebar({
  appName = "App",
  appRootUrl = "/",
  menuItems = [],
}: SidebarProps) {
  const { currentRoute } = useSelector(selectAppState);
  const selectedMenuItem = `${currentRoute}-menu-item`;

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <h3 className="logo" style={{ color: "white", margin: 20 }}>
        <Link to={appRootUrl}>{appName}</Link>
      </h3>

      <Menu theme="dark" mode="inline" selectedKeys={[selectedMenuItem]}>
        {menuItems.map((menuItem) => (
          <Menu.Item key={menuItem.key} icon={menuItem.icon}>
            <Link to={menuItem.link}>{menuItem.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
