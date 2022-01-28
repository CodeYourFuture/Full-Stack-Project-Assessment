const AddVideo = ({ data, setData }) => {
  // function for adding a video based on inputs the form
  const addVideo = function (event) {
    event.preventDefault(); // makes sure the browser doesn't refresh on submit
    const titleValue = document.getElementById("form-input-title").value;
    const linkValue = document.getElementById("form-input-link").value;

    // validating the data
    if (!titleValue || !linkValue) {
      // makes sure the title or link isn't an empty string
      alert("Link or Title input is empty");
      return;
    } else if (
      // make sure the link is a real YouTube link
      linkValue.match(
        /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)$/
      ) === null
    ) {
      alert("Entered link isn't valid YouTube.com or youtu.be link");
      return;
    } else if (data.some((video) => video.url === linkValue)) {
      // make sure the URL of the entered video doesn't already exist
      alert("Video already exists");
      return;
    }

    setData((data) => [
      ...data,
      {
        id: Math.floor(Math.random() * 100000),
        title: titleValue,
        url: linkValue,
        rating: 0,
      },
    ]);
  };

  return (
    <div id="add-video-container">
      <h2 id="add-video-header" className="orange-text">
        Add a video!
      </h2>
      <form className="add-video-form white-border orange-text">
        <label htmlFor="form-input-title">Title</label>
        <input type="text" id="form-input-title" placeholder="Title" />
        <label htmlFor="form-input-link">Link</label>
        <input type="text" id="form-input-link" placeholder="Link" />
        <input
          type="submit"
          id="form-submit"
          value="Add video"
          onClick={addVideo}
        />
      </form>
    </div>
  );
};

export default AddVideo;
