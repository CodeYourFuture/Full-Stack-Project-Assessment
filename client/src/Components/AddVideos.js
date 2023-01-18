import React, { useState, useEffect, useRef } from "react";

const LOCAL_STORAGE_KEY = "videoApp.videos";
console.log(LOCAL_STORAGE_KEY);

function AddVideos({ video }) {
  const [videos, setVideos] = useState([]);

  const VideoNameRef = useRef();
  const VideoUrlRef = useRef();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedVideos) setVideos(storedVideos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  function handleAddVideo(e) {
    const title = VideoNameRef.current.value;

    console.log(title);
    if (title === "") return;
    setVideos((prevVideos) => {
      debugger;
      console.log(prevVideos);
      return [
        ...prevVideos,
        {
          name: title,
          id: Math.floor(Math.random() * 5),
          src: video.url,
        },
      ];
    });
    if (title === "" || title === null) {
      alert("Please fill all the fields");
      return false;
    }
    VideoNameRef.current.value = null;
  }
  function handleUrl(e) {
    const videoUrl = VideoUrlRef.current.value;
    debugger;
    console.log(videoUrl);

    function validateYouTubeUrl(videoUrl) {
      if (videoUrl) {
        var regExp =
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (videoUrl.match(regExp)) {
          return true;
        }
      } else {
        return false;
      }
    }

    if (videoUrl) {
      validateYouTubeUrl(videoUrl);
    } else {
      alert("Please fill all the fields");
    }
  }
  // const handleCancel = () => {

  // };

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
            ref={VideoNameRef}
            onClick={handleAddVideo}
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
            ref={VideoUrlRef}
            onClick={handleUrl}
          />
        </label>
      </form>
      <button
        // onCancel={handleCancel}
        className="btn btn-outline-warning"
        type="submit"
        form="form1"
        value="Submit"
      >
        Cancel
      </button>
      <button
        className="btn btn-outline-success"
        // onClick={handleAddVideo}
        onClick={() => {
          handleAddVideo();
          handleUrl();
        }}
        type="submit"
        form="form1"
        value="Submit"
      >
        Add
      </button>
    </div>
  );
}

export default AddVideos;
