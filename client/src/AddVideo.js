function AddVideo({ submitClick }) {
  return (
    <>
    <form className="text-start" onSubmit={submitClick}>
      <div className="row mb-3">
        <label>Title</label>
        <div className="col-sm-10">
          <input type="text" name="title" class="form-control" id="submissionTitle"></input>
        </div>
      </div>
      <div className="row mb-3">
        <label>Youtube Link</label>
        <div className="col-sm-10">
          <input type="text" name="url" class="form-control" id="submissionUrl"></input>
        </div>
      </div>
      <div className="col-3">
        <button type="submit" className="btn form-submit" >
          Submit
        </button>
      </div>
    </form>
    </>
  );
}

export default AddVideo;