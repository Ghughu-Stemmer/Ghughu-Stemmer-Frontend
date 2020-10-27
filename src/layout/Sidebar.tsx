import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export interface SideBarMenuItem {
  id: string;
  icon: JSX.Element;
  label: string;
}

type SidebarProps = {
  appName: string;
  menuItems: SideBarMenuItem[];
};

export function Sidebar({
  appName = "App",
  menuItems = [],
}: SidebarProps) {
  const menuItemElements = menuItems.map((menuItem) => (
    <Menu.Item key={menuItem.id} icon={menuItem.icon}>
      {menuItem.label}
    </Menu.Item>
  ));

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0
      }}
    >
      <h3 className="logo" style={{ color: "white", margin: 20 }}>
        {appName}
      </h3>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
        {menuItemElements}
      </Menu>
    </Sider>
  );
}
