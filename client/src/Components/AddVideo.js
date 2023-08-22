const AddVideo = () => {
  return (
    <div
      class="modal fade"
      id="video"
      tabindex="-1"
      aria-labelledby="videoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="videoLabel">
              Add New Video
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="lead">
              Please provide the title and URL address of your favorite
              <span className="text-danger h3"> YouTube</span> video.
            </p>
            <form>
              <div class="mb-3">
                <label for="video-title" class="col-form-label">
                  Video Title:
                </label>
                <input type="text" class="form-control" id="video-title" />
              </div>
              <div class="mb-3">
                <label for="video-url" class="col-form-label">
                  URL:
                </label>
                <input type="text" class="form-control" id="video-url" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Add Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddVideo;
