function DisplayVideo({ data, upVote, downVote, deleteClick }) {
  const {id, title, url, rating} = data
  const vidId = url.replace("watch?v=", "embed/")

  return (
      <div className='col-12 col-md-6 col-lg-4'>
        <div className="ratio ratio-16x9">
          <iframe width="560" height="315" src={vidId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <h2 className="video-title text-start">{title}</h2>
        <div className="row align-items-center"> 
          <p className="video-rating col-4 text-start">Votes: {rating}</p>
          <button type="button" id={"up" + id} className="btn btn-success col-1 vote-btns" onClick={upVote}><i class="fas fa-thumbs-up fa-xs"></i></button>
          <button type="button" id={"down" + id} className="btn btn-danger col-1 vote-btns" onClick={downVote}><i class="fas fa-thumbs-down fa-xs"></i></button>
        </div>
        <div className="row">
          <button type="button" id={id} className="btn btn-danger col-3 col-md-3 delete-btn" onClick={deleteClick}>Delete</button>
        </div>
        
      </div>
  );
}

export default DisplayVideo;