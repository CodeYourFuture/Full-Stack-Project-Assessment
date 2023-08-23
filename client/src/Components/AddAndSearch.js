import Search from "./Search";
const AddAndSearch = ({ setKeyword }) => {
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
            <Search setKeyword={setKeyword} />
          </div>
        </div>
      </section>
    </>
  );
};
export default AddAndSearch;
