import { useState } from "react";

const AddVideo = ({ addVideo }) => {
  const [formInput, setFormInput] = useState({
    id: 5238523,
    title: "",
    url: "",
    // "rating":NULL
  });

  const submitHandler = (event) => {
    event.preventDefault();
    addVideo(formInput);
  };
  console.log(formInput);
  return (
    <form className="form_container grid" onSubmit={submitHandler}>
      <label htmlFor="add_url">url</label>
      <input
        id="add_url"
        type="text"
        placeholder="Write URL"
        onChange={(event) =>
          setFormInput({ ...formInput, url: event.target.value })
        }
      />
      <label htmlFor="add_title">title</label>
      <input
        id="add_title"
        type="text"
        placeholder="Write TITLE"
        onChange={(event) =>
          setFormInput({ ...formInput, title: event.target.value })
        }
      />
      <button className="btn">ADD VIDEO</button>
    </form>
  );
};

export default AddVideo;
