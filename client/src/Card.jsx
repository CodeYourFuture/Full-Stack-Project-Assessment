const Card = ({ video }) => {
  // split the URL into an array of 2 elements, the 1st element is the video id
  const videoID = video.url.split("=")[1];

  return (
    <div id={videoID + "-card"} className="card">
      <a
        href={video.url}
        id={videoID + "-title"}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="orange-text">{video.title}</h2>
      </a>
      <iframe
        id={videoID + "-player"}
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
      ></iframe>
      <h2 id={videoID + "-rating"} className="orange-text">
        Updoots: {video.rating}
      </h2>
    </div>
  );
};

export default Card;
