import React, { useState } from "react";
import { CDBBtn } from "cdbreact";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";

function InputForm({ addVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isYoutubeUrlValid(url)) {
      const newVideo = {
        id: Number(new Date().getTime()),
        title: title,
        url: url,
        rating: 1,
      };
      fetch("http://127.0.0.1:5000/addVideo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((res) => res.json())
        .then((data) => data);

      addVideo(newVideo);
      setTitle("");
      setUrl("");
    } else {
      alert("Invalid URL");
      console.log("Invalid URL");
    }
  };

  function isYoutubeUrlValid(url) {
    try {
      const validUrl = new URL(url);
      return (
        validUrl.hostname === "www.youtube.com" ||
        validUrl.hostname === "youtu.be"
      );
    } catch {
      return false;
    }
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
      </FormGroup>

      <div className="btn-section">
        <CDBBtn color="primary" circle type="submit">
          Add Video
        </CDBBtn>

        <CDBBtn color="danger" circle outline>
          Remove
        </CDBBtn>
      </div>
    </Form>
  );
}

export default InputForm;
