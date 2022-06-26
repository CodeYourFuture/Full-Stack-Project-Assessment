import React, { useState } from "react";
import axios from "axios";

const Form = ({ videos, setVideos, getData, setDisplayForm }) => {
  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
    rating: 0,
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVideo = {
      title: addFormData.title,
      url: addFormData.url,
      rating: addFormData.rating,
    };

    axios
      .post(`http://localhost:4000/`, newVideo)
      .then((res) => {
        if (res.status === 201) getData();
      })
      .catch((error) => console.log(error));

    const validateUrl = (url) => {
      const urlType =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(urlType)) {
        return url.match(urlType)[1];
      }
      return false;
    };

    if (validateUrl(newVideo.url)) {
      const newVideos = [...videos, newVideo];
      //console.log(newVideos);
      setVideos(newVideos);
    } else {
      alert("invalid Youtube url");
    }
  };

  return (
    <form onSubmit={handleAddFormSubmit}>
      <label>
        <input
          type="text"
          name="title"
          placeholder="Enter title..."
          onChange={handleAddFormChange}
          required
        />
      </label>

      <label>
        <input
          type="url"
          name="url"
          placeholder="Enter url..."
          onChange={handleAddFormChange}
          required
        />
      </label>
      <label>
        <input
          type="number"
          name="rating"
          placeholder="Enter rating..."
          onChange={handleAddFormChange}
          required
        />
      </label>
      <br />
      <button className="button" onClick={() => setDisplayForm(false)}>
        Cancel
      </button>
      <button className="button" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Form;
