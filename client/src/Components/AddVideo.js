import { useState } from "react";

const AddVideo = (props) => {
  const { setData } = props;
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const postFunction = async () => {
    const addVideo = {
      title: newVideoTitle,
      url: newVideoUrl,
    };
    const response = await fetch("http://127.0.0.1:5000", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addVideo),
    });
    const data = await response.json();
    if (data.result === "error") {
      setData(data.videos);
      setErrorMessage(data.message);
    } else {
      setData(data);
      setErrorMessage("");
    }
    // return setData(data.concat(addVideo));
  };
  const handleClick = async () => {
    await postFunction();
  };

  return (
    <div>
      <p>Add your favorite to the list</p>
      <input
        id="title"
        onChange={(e) => {
          setNewVideoTitle(e.target.value);
        }}
        type="text"
        placeholder="Title"
      ></input>
      <input
        id="url"
        onChange={(e) => {
          setNewVideoUrl(e.target.value);
        }}
        type="text"
        placeholder="Add url here"
      ></input>
      <button className="gradient-button" id="submit" onClick={handleClick}>
        Add video
      </button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};
export default AddVideo;
