// Style
import classes from "./VideoComponent.module.css";

const VideoComponent = ({ videoId, videoTitle, videoRating }) => {
  return (
    <div className={classes.wrapper}>
      <section>
        <h2 className={classes.details}>{videoTitle}</h2>
        <iframe
          className={classes.video}
          width='560'
          height='315'
          src={`https://www.youtube.com/embed/${videoId}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </section>
      <section className={classes.details}>
        Rating <br /> {videoRating}
      </section>
    </div>
  );
};

export default VideoComponent;
