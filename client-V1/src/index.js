import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ConfigProvider direction="ltr">
    <Router>
      <App />
    </Router>
  </ConfigProvider>
  // </React.StrictMode>
);
