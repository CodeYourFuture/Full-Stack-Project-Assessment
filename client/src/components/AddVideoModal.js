export default function AddVideoModal({ handleClose }) {
  return (
    <div className="add-video-backdrop">
      <div className="add-video">
        <h1>Add Video</h1>
        <div>
          <form>
            <div>
              <label>
                Title
                <input
                  name="title"
                  type="text"
                  required=""
                  id="newTitle"
                  value="value"
                ></input>
              </label>
            </div>
            <div>
              <label>
                URL
                <input
                  name="url"
                  type="text"
                  required=""
                  id="newUrl"
                  value="value"
                ></input>
              </label>
            </div>
            <button type="button" class="btn btn-info p-1 m-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
