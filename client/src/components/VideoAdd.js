import React, { useState } from "react";

export default function VideoAdd({ setVideos }) {
  function useFormState(initialState) {
    const [state, setState] = useState(initialState);
    function setEvent(event) {
      setState(event.target.value);
    }
    return [state, setEvent];
  }
  const [title, setTitle] = useFormState("");
  const [url, setUrl] = useFormState("");
  //UPGRADE LATER
  function handleSubmit(event) {
    event.preventDefault();
    const newVideo = {
      id: url.length + title.length, //LATER > DB will create unique id
      title: title,
      url: url,
      rating: 0,
    };
    setVideos((prev) => prev.concat(newVideo));
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputTitle">Title</label>
        <input
          id="inputTitle"
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
          onChange={setTitle}
          required
        />

        <label htmlFor="inputUrl">Title</label>
        <input
          id="inputUrl"
          type="text"
          name="url"
          placeholder="The youtube url..."
          value={url}
          onChange={setUrl}
          required
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
