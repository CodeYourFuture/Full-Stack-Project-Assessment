import { useState } from "react";

const AddVideo = (props) => {
  const { data, setData } = props;
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  console.log(data);

  const handleClick = () => {
    let addVideo = {
      id: 1,
      title: newVideoTitle,
      url: newVideoUrl,
      rating: 0,
    };
    console.log("hi");
    // data.concat(addVideo);

    console.log(data);
    // data.push(addVideo);
    return setData(data.concat(addVideo));
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
      <button id="submit" onClick={handleClick}>
        Add video
      </button>
    </div>
  );
};
export default AddVideo;
