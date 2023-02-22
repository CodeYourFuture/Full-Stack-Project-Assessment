import React from "react";
import { Layout } from "antd";
import "../../assets/scss/header.scss";

const { Header: AntHeader } = Layout;

export default function Header() {
  return (
    <AntHeader className="header">
      <h2>Video Recommendation</h2>
    </AntHeader>
  );
}
