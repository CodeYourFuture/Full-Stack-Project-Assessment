const VideoWidget = (props) => {
  const videoId = props.video.url.split('=')[1];

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={props.video.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <h3>{props.video.title}</h3>
      <p>{props.video.rating}</p>
    </div>
  );
};

export default VideoWidget;
