import React from "react";

export default function AddVideoForm() {
  return (
    <div className="form">
      <input type="text" placeholder="Title" className="form--input" />
      <input type="text" placeholder="url" className="form--input" />
      <button className="form--button">Add New Video</button>
    </div>
  );
}
