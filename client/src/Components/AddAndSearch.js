import AddVideo from "./AddVideo";
const AddAndSearch = () => {
  return (
    <>
      <section className="bg-secondary text-light p-4">
        <div className="container">
          <div className="d-md-flex align-items-center justify-content-between">
            <button
              className="btn btn-info btn-lg mb-2"
              data-bs-toggle="modal"
              data-bs-target="#video"
            >
              Add Video
            </button>
            <div className="input-group mb-3 news-input">
              <input
                type="text"
                className="form-control "
                placeholder="Search video by name..."
                aria-label="Search video input"
              />
              <button className="btn btn-danger text-light" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddVideo />
    </>
  );
};
export default AddAndSearch;
