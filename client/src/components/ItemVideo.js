function ItemVideo({ title, url, rating }) {
  const link = url.slice(-11);
  return (
    <div className="single-video">
      <h4>{title}</h4>
      <iframe
        width="400"
        height="240"
        src={`https://www.youtube.com/embed/${link}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button>like</button>
      <button>Dislike</button>
      <p>{rating}</p>
    </div>
  );
}
export default ItemVideo;
