import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function NewVideoForm() {
  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  function postVideo(data) {
    axios({
      method: "post",
      url: "/api",
      data,
    })
      .then((res) => {
        setForm({
          title: "",
          url: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnChange(key, value) {
    return setForm({ ...form, [key]: value });
  }

  return (
    <form className="form-inline d-flex justify-content-center">
      <div className="form-group mb-2">
        <label forHtml="videoTitle" className="sr-only">
          Title
        </label>
        <input
          value={form.title}
          type="text"
          className="form-control"
          id="videoTitle"
          onChange={(event) => handleOnChange("title", event.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="form-group mb-2">
        <label forHtml="videoUrl" className="sr-only">
          URL
        </label>
        <input
          value={form.url}
          type="text"
          className="form-control"
          id="videoUrl"
          onChange={(event) => handleOnChange("url", event.target.value)}
          placeholder="URL"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mb-2"
        onClick={(e) => {
          e.preventDefault();
          postVideo(form);
        }}
      >
        Post Video
      </button>
    </form>
  );
}

export default NewVideoForm;
