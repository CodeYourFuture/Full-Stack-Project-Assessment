import { useState } from "react";

const AddVideo = ({ addVideo }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [formInput, setFormInput] = useState({
    title: "",
    url: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const missingObject = Object.entries(formInput)
      .filter(([key, value]) => {
        return !value;
      })
      .map(([key, value]) => {
        return ` the ${key} is missing`;
      });

    if (missingObject.length >= 1) {
      setError(true);
      setErrorMessage(missingObject);
      return;
    }

    if (!isValidYouTubeUrl(formInput.url)) {
      setError(true);
      setErrorMessage(["please insert a valid youtube url"]);
      return;
    }

    setError(false);
    addVideo(formInput);
    setFormInput({
      title: "",
      url: "",
    });
  };

  function isValidYouTubeUrl(url) {
    let youtubePattern =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{10}[A-Z]$/;
    return youtubePattern.test(url);
  }

  return (
    <form className="form_container grid" onSubmit={submitHandler}>
      {error && (
        <div className="error_container">
          <ul>
            {errorMessage.map((message) => (
              <li>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <label htmlFor="add_url">url</label>
      <input
        id="add_url"
        type="text"
        value={formInput.url}
        placeholder="Write URL"
        onChange={(event) =>
          setFormInput({ ...formInput, url: event.target.value })
        }
      />
      <label htmlFor="add_title">title</label>
      <input
        id="add_title"
        type="text"
        value={formInput.title}
        placeholder="Write TITLE"
        onChange={(event) =>
          setFormInput({ ...formInput, title: event.target.value })
        }
      />
      <button className="btn">ADD VIDEO</button>
    </form>
  );
};

export default AddVideo;
