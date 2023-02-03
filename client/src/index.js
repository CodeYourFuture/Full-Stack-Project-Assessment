import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
