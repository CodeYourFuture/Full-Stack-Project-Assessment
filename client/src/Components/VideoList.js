import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import Exampleresponse from "../exampleresponse.json";

function removeLastPart(url) {
  let regex = /^.*(youtu.be\/|v\/|u\/w\/|embed\/|watch\?v=|&v=)([^#?]*).*/;
  let match = url.match(regex);
  return match && match[2].length === 11 ? match[2] : null;
}

function VideoList() {
  const [youtubeURLS, setYoutubeURLS] = useState(Exampleresponse);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(null);
  const [isTitle, setIsTitle] = useState(null);

  function removeV(index) {
    alert(index);
    const newUrls = [...youtubeURLS];
    newUrls.splice(index, 1);
    setYoutubeURLS(newUrls);
  }

  const increaseRatings = (index) => {
    const newUrls = [...youtubeURLS];
    newUrls[index].rating += 1;
    setYoutubeURLS(newUrls);
  };

  const decreaseRatings = (index) => {
    const newUrls = [...youtubeURLS];
    if (newUrls[index].rating === 0) {
      return 0;
    }
    newUrls[index].rating -= 1;
    setYoutubeURLS(newUrls);
  };

  function validateYouTubeUrl(url) {
    if (url) {
      var regExp =
        /^(?:https?:\/\/)?(?: m\.|www\.)?(?: youtu\.be\/|youtube\.com\/(?: embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\ S+)?$/;
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

    if (validateYouTubeUrl(url) === true && titleRequirements(title) === true) {
      let newYoutubeVideo = {
        title,
        url,
      };

      setYoutubeURLS([...youtubeURLS, newYoutubeVideo]);
      setIsUrlValid(true);
      setIsTitle(true);
    }

    if (
      validateYouTubeUrl(url) === false &&
      titleRequirements(title) === true
    ) {
      setIsUrlValid(false);
    }

    if (
      validateYouTubeUrl(url) === true &&
      titleRequirements(title) === false
    ) {
      setIsTitle(false);
    }

    if (
      validateYouTubeUrl(url) === false &&
      titleRequirements(title) === false
    ) {
      setIsTitle(false);
      setIsUrlValid(false);
    }
  }

  const videoPlayer = youtubeURLS
    .sort((a, b) => b.rating - a.rating)
    .map((movie, index) => {
      const youtubeId = removeLastPart(movie.url);
      if (!youtubeId) {
        return null;
      }
      const youtubeEmbed = `https://www.youtube.com/embed/${youtubeId}`;
      return (
        <>
          <div key={index}>
            <iframe
              width="560"
              height="315"
              src={youtubeEmbed}
              title="Tsione's YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4 key={movie.title}>Title : {movie.title}</h4>
            <div>
              <span>{movie.rating}</span>
              <button
                aria-label="Unlike"
                onClick={() => increaseRatings(index)}
              >
                <FontAwesomeIcon icon={faThumbsUp} className="faIcon" />
              </button>

              <button aria-label="Like" onClick={() => decreaseRatings(index)}>
                <FontAwesomeIcon icon={faThumbsDown} className="faIcon" />
              </button>
            </div>
            <button aria-label="delete Video" onClick={() => removeV(index)}>
              Delete
            </button>
          </div>
        </>
      );
    });

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
            <button className="" type="submit">
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
      <div>{videoPlayer}</div>
    </>
  );
}

export default VideoList;
