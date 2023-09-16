import React from "react";
import videoData from "./exampleresponse.json";

export default function AddVideo(props) {

  return (
    <div>
      <form>
        <label>{props.label}</label>
        <input type="text" />
      </form>
    </div>
  );
}
