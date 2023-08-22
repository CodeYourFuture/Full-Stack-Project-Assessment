import React from "react";

function AddVideo() {
  return (
    <>
      <div className="text-center">
        <h2>Add Your Video Here</h2>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "20vh" }}
      >
        <form>
          <div className="form form-row align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="title"
                placeholder="Enter a title"
              />
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="url">
                Add Video URL
              </label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">URL</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="Video URL"
                />
              </div>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddVideo;
