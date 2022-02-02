import { useState } from "react";

const AddVideo = ({ setState }) => {
  const [formInput, setFormInput] = useState({ title: "", url: "" });

  const addVideo = async function (event) {
    event.preventDefault(); // makes sure the browser doesn't refresh on submit
    const titleInput = formInput.title.trim();
    const urlInput = formInput.url.trim();

    if (!titleInput || !urlInput) return alert("Title or link field is empty!");

    const result = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titleInput, url: urlInput }),
    });

    result
      .json()
      .then((res) => {
        setState((state) => {
          // ctrl+c ctrl+v
          const newVideos = [...state]; // make a copy
          newVideos.push(res.id); // push new data onto that copy
          return newVideos[0]; // return the copy with all the old data + new data
        });
        window.location.reload(true); // reload the window to refresh the video listing (need to look into state more)
      })
      .catch((error) => alert(error));
  };

  // useState set function can only update one thing at a time, this took too long to work out and I am crying
  const changeHandler = (event) =>
    setFormInput((formInput) => ({
      ...formInput, // spread the old data so we don't lose the other key
      [event.target.name]: event.target.value, // update the key we want to update
    }));

  return (
    <div id="add-video-container">
      <h2 id="add-video-header" className="orange-text">
        Add a video!
      </h2>
      <form className="add-video-form white-border orange-text">
        <label htmlFor="form-input-title">Title</label>
        <input
          type="text"
          id="form-input-title"
          placeholder="Title"
          name="title"
          value={formInput.title}
          onChange={changeHandler}
        />
        <label htmlFor="form-input-link">Link</label>
        <input
          type="text"
          id="form-input-link"
          placeholder="Link"
          name="url"
          value={formInput.url}
          onChange={changeHandler}
        />
        <input
          type="submit"
          id="form-submit"
          value="Add video"
          onClick={addVideo}
          onChange={changeHandler}
        />
      </form>
    </div>
  );
};

export default AddVideo;
