import React, { useState } from "react";

const NewVideo = ({ setYoutubeURLS, youtubeURLS }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(null);
  const [isTitle, setIsTitle] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function validateYouTubeUrl(url) {
    if (url) {
      var regExp =
        /^(?:https?:\/\/)?(?: m\.|www\.)?(?: youtu\.be\/|youtube\.com\/(?: embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?: S+)?$/;
      if (url.match(regExp)) {
        return true;
      }
    }
    return false;
  }

  function titleRequirements(string) {
    if (string) {
      return true;
    } else {
      return false;
    }
  }

  function handleNewVideo(e) {
    e.preventDefault();

    if (
      validateYouTubeUrl(url) === false &&
      titleRequirements(title) === true
    ) {
      setIsUrlValid(false);
      return;
    }

    if (
      validateYouTubeUrl(url) === true &&
      titleRequirements(title) === false
    ) {
      setIsTitle(false);
      return;
    }

    if (
      validateYouTubeUrl(url) === false &&
      titleRequirements(title) === false
    ) {
      setIsTitle(false);
      setIsUrlValid(false);
      return;
    }
    setLoading(true);

    let newYoutubeVideo = {
      title,
      url,
      rating: 0,
      timeSent: new Date().toLocaleDateString(),
    };

    fetch("http://127.0.0.1:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newYoutubeVideo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYoutubeURLS([...youtubeURLS, newYoutubeVideo]);
        setLoading(false);
        setIsUrlValid(true);
        setIsTitle(true);
        setUrl("");
        setTitle("");
      })
      .catch((error) => {
        console.log("Error while making request");
        setLoading(false);
      });
  }

  return (
    <>
      <div>
        <form onSubmit={handleNewVideo}>
          <fieldset>
            <br />
            <h3>Add Video</h3>
            <br />
            Title :{" "}
            <input
              aria-label="mainInput"
              type="text"
              className=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            URL :
            <input
              aria-label="mainInput"
              type="text"
              className=""
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <br />
            <br />
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </fieldset>
        </form>
        <>{isUrlValid === false && <div>Invalid Youtube url</div>}</>
        <>{isTitle === false && <div>Title is required</div>}</>
        <>
          {isTitle === false && <div>Title and Youtube Url are required</div>}
        </>
      </div>
    </>
  );
};

export default NewVideo;
