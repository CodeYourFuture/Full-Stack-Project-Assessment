// import Search from "./Search";

const AddVideoForm = () => {
  return (
    <>
      <form>
        <label htmlFor="movie-title">
          Title
          <input type="text" name="movie-title" id="movie-title" />
        </label>
        <label htmlFor="movie-url">
          URL
          <input type="text" name="movie-url" id="movie-url" />
        </label>{" "}
        <br />
        <button>CANCEL</button>
        <button>ADD</button> <br />
      </form>
    </>
  );
};

export default AddVideoForm;
