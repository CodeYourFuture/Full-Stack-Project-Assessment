function Video(props) {
  return (
    <div className="singleVideo">
      <iframe title={props.title} src={props.url} className="videoFrame">
        {" "}
      </iframe>
      <h5>{props.title}</h5>
      <p className="rating">
        <span>rating: {props.rating}</span>
        <button className="btn">remove video</button>
      </p>
    </div>
  );
}

export default Video;
