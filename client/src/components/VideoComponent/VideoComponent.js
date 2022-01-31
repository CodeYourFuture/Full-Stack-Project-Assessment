import { useState } from "react";

// Style
import classes from "./VideoComponent.module.css";

// Components
import Button from "../Button/Button";

const VideoComponent = ({ videoId, videoTitle, videoRating }) => {
  const [removeVideo, setRemoveVideo] = useState(false);
  const [currRating, setCurrRating] = useState({
    videoRating,
  });

  const removeButtonClickHandler = () => {
    setRemoveVideo(true);
  };

  const likeButtonClickHandler = () =>
    setCurrRating(() => {
      let curr = { ...currRating };
      curr.videoRating++;
      return curr;
    });

  const disLikeButtonClickHandler = () =>
    setCurrRating(() => {
      let curr = { ...currRating };
      curr.videoRating--;
      return curr;
    });

  return (
    <div className={!removeVideo ? classes.wrapper : classes.delWrapper}>
      <Button
        label='↑'
        functionality={likeButtonClickHandler}
        buttonClass='likeButton'
      />
      <Button
        label='↓'
        functionality={disLikeButtonClickHandler}
        buttonClass='disLikeButton'
      />
      <section>
        <h2 className={classes.details}>{videoTitle}</h2>
        <iframe
          className={classes.video}
          width='560'
          height='315'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='YouTube video player'
          alt={`thumbnail for "${videoTitle}"`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </section>
      <section className={classes.details}>
        Rating <br /> {currRating.videoRating}
      </section>
      <Button
        label='Remove'
        functionality={removeButtonClickHandler}
        buttonClass='deleteButton'
      />
    </div>
  );
};

export default VideoComponent;
