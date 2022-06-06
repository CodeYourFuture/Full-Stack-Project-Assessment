import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function NewVideoForm() {
  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  function postVideo(data) {
    if (matchYoutubeUrl(data.url) === false) alert("wrong URL");
    else {
      data.url = `https://www.youtube.com/embed/${matchYoutubeUrl(data.url)}`;
      axios({
        method: "post",
        url: "/api",
        data,
      })
        .then(() => {
          setForm({
            title: "",
            url: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleOnChange(key, value) {
    return setForm({ ...form, [key]: value });
  }

  return (
    <form className="form-inline d-flex justify-content-center">
      <div className="form-group mb-2">
        <label forhtml="videoTitle" className="sr-only">
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
        <label forhtml="videoUrl" className="sr-only">
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
