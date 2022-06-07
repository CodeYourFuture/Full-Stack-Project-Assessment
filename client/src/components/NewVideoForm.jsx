import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Input from "./atoms/Input";

function NewVideoForm({ loadVideos }) {

  const defaultForm = { title: "", url: "" };
  const [form, setForm] = useState(defaultForm);

  function matchYoutubeUrl(url) {
    const p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  function handleOnChange(key, value) {
    return setForm({ ...form, [key]: value });
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
          loadVideos();
          setForm(defaultForm);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  return (
    <form className="form-inline d-flex justify-content-center">
      <Input
        setForm={setForm}
        label="Title"
        placeholderText="Title"
        value={form.title}
        onChange={(event) => handleOnChange("title", event.target.value)}
      />
      <Input
        setForm={setForm}
        label="URL"
        value={form.url}
        placeholderText="YouTube URL"
        onChange={(event) => handleOnChange("url", event.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary mb-2"
        onClick={(e) => {
          e.preventDefault();
          postVideo(form);
        }}
        disabled={form.title === "" || form.url === ""}
      >
        Post Video
      </button>
    </form>
  );
}

export default NewVideoForm;
