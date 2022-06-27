import React, { useState } from "react";
import axios from "axios";

const NewVideos = ({setAllVideos, setVisible}) => {
  const[validationUrl, setValidationUrl ] = useState("")
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const updateTitle = (event) => {
    const title = event.target.value;
    setTitle(title);
  };
    function matchYoutubeUrl(url) {
      let urlType =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(urlType)) {
        return url.match(urlType)[1];
      }
      return false;
    }

  const updateUrl = (event) => {
    const url = event.target.value;
    setUrl(url);
  if (matchYoutubeUrl(url)) return setValidationUrl("valid Url");
  setValidationUrl("Invalid Youtube URL");
  };

  const addVideo = (event) => {
    //prevent all pages from refreshing
    event.preventDefault();

    // const generateId = (e) => {
    //   return e++;
    // };
    const newVideo = { title, url, rating: 5 };
if (matchYoutubeUrl(url)) setAllVideos((allVideos) => {
  //Clear the input after submitting
  setTitle("");
  setUrl("");
  //  return allVideos.concat(newVideo);
  axios
    .post("https://full-stack-project-assesment.herokuapp.com/", newVideo)
    .then((res) => {
      
      if (res.status === 201) {
        axios
          .get("https://full-stack-project-assesment.herokuapp.com/")
          .then((res) => {
            console.log(res.data)
            setAllVideos(res.data);
          });
      }
    });
});
      
  };

  return (
    <div>
      {validationUrl}
      <form onSubmit={addVideo}>
        <label htmlFor="title" name="title">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={updateTitle}
          required
        />
        <label htmlFor="url" name="url">
          url:
        </label>
        <input type={"text"} name="url" value={url} onChange={updateUrl} />

        <button type="submit"> Add Video</button>
        <button type="submit" onClick={() => setVisible(false)}>
          {" "}
          Cancel
        </button>
      </form>
    </div>
  );
};
export default NewVideos;
