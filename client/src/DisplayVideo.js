import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function DisplayVideo({ videoIndex, videoUrl, videoRating, videoInfo }) {
  const incrementVote = () => {
    setAnUpdate({ increment: videoIndex });
  };

  const decrementVote = () => {
    setAnUpdate({ decrement: videoIndex });
  };

  // Remove Button functionality
  const handleRemove = () => {
    setAnUpdate({ removed: videoIndex });
  };

  let videoSource;
  let theRating = videoRating;
  let videoObject = videoInfo[videoIndex];
  let theTitle = videoObject.renderTitle;
  let showRatings =
    theRating + "\u00A0vote" + (Math.abs(theRating) !== 1 ? "s" : ""); // "\u00A0" UNICODE EQUIVALENT TO &nbsp;
  let errorOccurred = videoObject.errorOccurred;

  /* USECONTEXT to pass down the 'setter' function and data */
  const { setAnUpdate, theData } = useContext(UserContext);

  let fullTitle = theData.videosList[videoIndex].title;

  if (!errorOccurred) {
    videoSource = `https://www.youtube.com/embed/${videoObject.youtube_id}`;
  }

  return (
    <li className="vid-list-item">
      <div className="vid-list-content">
        <div className="displayTitle">{theTitle}</div>
        <div className="votes">
          <i className="fas fa-thumbs-up vote" onClick={incrementVote}></i>
          <p className="showratings">{showRatings}</p>
          <i class="fas fa-thumbs-down vote" onClick={decrementVote}></i>
        </div>

        {errorOccurred && (
          <div>
            <p>This URL is not valid:</p>
            <p>
              <strong>{videoUrl}</strong>
            </p>
          </div>
        )}

        {!errorOccurred && (
          <>
            <iframe
              width="560"
              height="315"
              src={videoSource}
              /*title="YouTube video player"*/
              title={fullTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="remove-button" onClick={handleRemove}>
              Remove
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default DisplayVideo;
