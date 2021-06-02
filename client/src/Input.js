import React from "react";

export default function Input(props) {
  return (
    <div>
      <input type="search" onChange={props.getVideo}></input>
    </div>
  );
}
