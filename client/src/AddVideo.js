function AddVideo(props) {
  return (
    <div className="addVideo">
      <h4>Add a video</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let title = e.target.children[0].value;
          let url = e.target.children[1].value;
          if (title !== "" && url !== "") {
            let uri = url.replace("watch?v=", "embed/");
            props.add(title, uri);
            e.target.reset();
          }
        }}
      >
        <input type="text" placeholder="Enter title" />
        <input type="text" placeholder="Enter URL" />
        <button className="btn">Add Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
