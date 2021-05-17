import Button from '../UI/Button';

const VideoWidget = (props) => {
  const videoId = props.video.url.split('=')[1];

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={props.video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3>{props.video.title}</h3>
      <Button clicked={props.videoUpVote}>Plus</Button>
      <p>{props.video.rating}</p>
      <Button clicked={props.videoDownVote}>Minus</Button>
      <Button>Delete</Button>
    </div>
  );
};

export default VideoWidget;
