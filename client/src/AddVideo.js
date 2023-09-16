function AddVideo(props) {
  return (
    <div className="search-add">
      <div className="addVideo">
        <h4>Add a video</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let title = e.target.children[0].value;
            let url = e.target.children[1].value;
            if (title !== "" || url !== "") {
              let uri = url.replace("watch?v=", "embed/");
              console.log(uri, title);
              props.add(title, uri);
              e.target.reset();
            } else {
              props.add(title, url);
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter title"
            className="form-control"
          />
          <input type="text" placeholder="Enter URL" className="form-control" />
          <button className="btn">Add Video</button>
        </form>
        <p className="red-failure">
          {props.failure.message ? props.failure.message : ""}
        </p>
      </div>
      <div className="search">
        <h4>Search By ID</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            let search = e.target.children[1].value;
            console.log(search);
            props.search(search);
            e.target.reset();
          }}
        >
          <button className="btn">Search</button>
          <input
            type="search"
            placeholder="Enter ID"
            className="form-control"
          />
        </form>
        <p className="red-failure">
          {props.searchId.message ? props.searchId.message : ""}
        </p>
      </div>
    </div>
  );
}

export default AddVideo;
