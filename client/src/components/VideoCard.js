const Card = ({ data }) => {
  const videoID = data.url.substring(data.url.indexOf("=") + 1);
  return (
    <div className="card">
      <h3 className="title">{data.title}</h3>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
export default Card;