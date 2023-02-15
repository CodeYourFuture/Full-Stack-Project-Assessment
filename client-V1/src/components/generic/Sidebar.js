import {
  SolutionOutlined,
  SettingOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
// import Link from "antd/es/typography/Link";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />, [
    getItem(<Link to="/Week1">Week 1</Link>, "list", <SolutionOutlined />),
    getItem("Week 2", "Week2", <SolutionOutlined />),
    getItem("Week 3", "Week3", <SolutionOutlined />),
  ]),
  getItem("Video management", "video", <VideoCameraOutlined />, [
    getItem(
      <Link to="/video/addVideo">Add video</Link>,
      "post",
      <VideoCameraAddOutlined />
    ),
    getItem(
      <Link to="/video">List of videos</Link>,
      "list",
      <UnorderedListOutlined />
    ),
    getItem("Search for videos", "search", <SearchOutlined />),
  ]),
  getItem("Settings", "setting", <SettingOutlined />, [getItem("Option", "9")]),
];

const rootSubmenuKeys = ["dashboard", "video", "setting"];

export default function Sidebar() {
  const [openKeys, setOpenKeys] = useState(["video", "dashboard"]);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div>
      <Sider>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 256,
          }}
          items={items}
        />
      </Sider>
    </div>
  );
}
