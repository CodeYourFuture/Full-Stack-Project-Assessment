const VideoList = () => {
  return (
    <>
      <section className="p-5">
        <div className="container">
          <div className="row row-cols-auto text-center g-4 ">
            <div className="card col col-md-6 col-lg-4">
              <iframe
                src="https://www.youtube.com/embed/pWahNIMRxR0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <div className="d-flex align-items-center justify-content-between h1 mb-3 d">
                  <i className="bi bi-hand-thumbs-up-fill text-danger"></i>
                  <p className="mt-2">0 votes</p>
                  <i className="bi bi-hand-thumbs-down-fill text-danger"></i>
                </div>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default VideoList;
