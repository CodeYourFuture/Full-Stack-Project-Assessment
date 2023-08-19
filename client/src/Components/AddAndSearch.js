const AddAndSearch = () => {
  return (
    <>
      <section className="bg-secondary text-light p-4">
        <div className="container">
          <div className="d-md-flex align-items-center justify-content-between">
            <button class="btn btn-info btn-lg mb-2">Add Video</button>
            <div class="input-group mb-3 news-input">
              <input
                type="text"
                className="form-control "
                placeholder="Search video by name..."
                aria-label="Search video input"
              />
              <button class="btn btn-danger text-light" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddAndSearch;
