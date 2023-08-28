import React, { useState } from "react";

function VideoForm({ videoData, setVideoData }) {
  const [errorMessage, setErrorMessage] = useState("");

  function addVideoHandler(event) {
    /**
     We are creating a new video object and adding to state 
     */
    function validateUrl(urlObject) {
      console.log("urlObject --->", urlObject);
      if (!urlObject.startsWith("https://www.youtube.com")) {
        return false;
      }
      return true;
      // return either validated URL or an error
    }

    event.preventDefault();

    const formTitle = event.target.form.title.value;
    const formUrl = event.target.form.url.value;
    console.log(formUrl);

    if (validateUrl(formUrl) && formTitle !== "") {
      const newData = {
        id: parseInt(Math.random() * 1000),
        title: formTitle,
        url: formUrl,
        rating: 0,
        timeSent: Date(),
      };
      
      setVideoData([...videoData, newData]);
      setErrorMessage("");
    } else if (formTitle === "" && !validateUrl(formUrl)) {
      setErrorMessage("Add a title and a valid URL");
    } else if (formTitle === "") {
      setErrorMessage("Add a title");
    } else {
      setErrorMessage("Add a valid URL");
    }

    event.target.form.reset();
  }
  return (
    <div>
      <form className="m-5 flex flex-col items-center gap-7 pb-3 text-lg">
        <div className="p-2 text-center text-4xl font-bold">
          <h2>Add your YouTube video</h2>
        </div>

        <div className="grid gap-7 text-xl font-extrabold">
          <div className="flex gap-3">
            <label htmlFor="title">Please enter your title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Video title"
              required
              className="h-15 w-full rounded bg-gray-200 p-2 pl-4 pr-4"
            />
          </div>
          <div className="flex gap-3">
            <label htmlFor="url">Please enter your YouTube video url:</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="YouTube video URL"
              required
              className="h-15 w-full rounded bg-gray-200 p-2 pl-4 pr-4"
            />
          </div>
        </div>

        <button
          onClick={addVideoHandler}
          type="submit"
          className="m-2 rounded bg-black px-5 py-3 text-white"
        >
          Add
        </button>

        <p>{errorMessage}</p>
      </form>
    </div>
  );
}

export default VideoForm;
