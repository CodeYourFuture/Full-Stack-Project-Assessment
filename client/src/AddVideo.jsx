import { useState, React } from "react";
import "./AddVideo.css";

export const AddVideo = (props) => {
  const [clickAdd, setClickAdd] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleAddVideoButton = () => {
    clickAdd === false ? setClickAdd(true) : setClickAdd(false);
  };

  const handleTitleInputChange = (e) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const handleUrlInputChange = (e) => {
    e.preventDefault();
    setUrlInput(e.target.value);
  };

  const handleFormSubmit = () => {
    let newCard = {};
    newCard = { title: titleInput, url: urlInput };
    props.videos = props.videos.push(newCard);
    return props.videos;
    console.log(props.videos.push(newCard));
  };

  console.log(titleInput);
  console.log(urlInput);

  return (
    <div>
      <a href="#" alt="Add video button" onClick={handleAddVideoButton}>
        Add video
      </a>
      {clickAdd === true ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleInputChange}
              name="title"
              required
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={urlInput}
              onChange={handleUrlInputChange}
              name="url"
              required
            />
            <input id="submitBtn" type="submit" />
          </label>
        </form>
      ) : null}
    </div>
  );
};
