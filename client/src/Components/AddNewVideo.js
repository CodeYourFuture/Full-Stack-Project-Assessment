import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddNewVideo({ addNewVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }
  function handleSubmit() {
    const newVideo = {
      id: uuidv4(),
      title: title,
      url: url,
      rating: 0,
      time: new Date().getFullYear(),
    };
    addNewVideo(newVideo);
    if (title === "" || title === null) {
      alert("Please fill all the fields");
      return false;
    }
  }

  // function validateYouTubeUrl() {
  //   if (url) {
  //     var regExp =
  //       /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  //     if (url.match(regExp)) {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <div>
      <form>
        <label>
          Title
          <input
            style={{
              color: "black",
              borderRadius: 10,
            }}
            required=""
            type="text"
            name="name"
            onChange={handleChangeTitle}
          />
        </label>
        <label>
          URL
          <input
            style={{
              color: "black",
              borderRadius: 10,
            }}
            required=""
            type="text"
            name="name"
            onChange={handleChangeUrl}
          />
        </label>
      </form>
      <button
        className="btn btn-outline-warning"
        type="submit"
        form="form1"
        value="Submit"
      >
        Cancel
      </button>
      <button
        className="btn btn-outline-success"
        onClick={handleSubmit}
        type="submit"
        form="form1"
        value="Submit"
      >
        Add
      </button>
    </div>
  );
}
