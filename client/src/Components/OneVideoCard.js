const OneVideoCard = ({ id, title, url, rating }) => {
  return (
    <div key={id} className="card col col-md-6 col-lg-4 border-0  ">
      <iframe
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="d-flex align-items-center justify-content-between h1 mb-3 d">
          <i className="bi bi-hand-thumbs-up-fill text-danger"></i>
          <p className="mt-2">{rating} votes</p>
          <i className="bi bi-hand-thumbs-down-fill text-danger"></i>
        </div>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};
export default OneVideoCard;
