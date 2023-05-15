import React, { useState } from "react";

function AddVideos({ setVideos }) {
  const [toggleArea, setToggleArea] = useState(false);

  const toggleShow = () => setToggleArea((s) => !s);

  const initialState = {
    title: "",
    url: "",
  };

  const [formData, setFormData] = useState(initialState);

  function handleSubmit(event) {
    event.preventDefault();

    let randomID = Math.floor(100000 + Math.random() * 900000);

    const newVideo = {
      id: randomID,
      title: formData.title,
      url: formData.url,
      rating: formData.rating,
    };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
    setFormData(initialState);
  }

  function handleChange(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <button onClick={toggleShow}>Add Video</button>
      {toggleArea && (
        <form method="post" onSubmit={handleSubmit}>
          <legend>Video Submission</legend>
          <section className="title-block">
            <label htmlFor="title">Enter title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="url">Enter URL: </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </section>
          <button type="submit">Add Video</button>
        </form>
      )}
    </div>
  );
}

export default AddVideos;