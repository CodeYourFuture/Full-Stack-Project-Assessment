const AddVideo = () => {

    return (
      <>
        <h2 className="addVideo">Add Video</h2>
        <form className="addvideo-form" method="post" action="submit">
          <div className="addvideo">
            <label for="title" name="title">
              Title:
            </label>
            <input className="input" type="text" name="title" required />
          </div>
          <div className="addvideo">
            <label for="url" name="url">
              {" "}
              URL:
            </label>
            <input className="input" type="text" name="url" required />
          </div>

          <div className="addvideo">
            <button>Add</button>
            <button>Delete</button>
          </div>
        </form>{" "}
      </>
    );
 }








export default AddVideo;