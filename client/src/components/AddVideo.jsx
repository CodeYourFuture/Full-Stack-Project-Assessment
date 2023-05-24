import { useState, useRef } from "react";

export default function AddVideo({ setRefreshVideos }) {
  const [formUrl, setFormUrl] = useState(null);
  // const [formTitle, setFormTitle] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const formInputUrl = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("handleSubmit clicked");
    setFormLoading(true);
    try {
      setFormSuccess(false);
      setFormError(false);

      // using original html5 form (but this needs multer on the backend)
      // const formData = new FormData(event.target);
      // console.log("formData:", formData);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: formData,
        body: JSON.stringify({
          url: formUrl,
          // title: formTitle,
        }),
      });

      const data = await response.json();
      console.log("AddVideo handleSubmit POST request data:", data);

      if (data.success) {
        setFormError(data.error);
        setFormSuccess(data.success);
        setFormMessage(data.message);
        setRefreshVideos((prevRefreshVideos) => !prevRefreshVideos);
        formInputUrl.current.value = "";
      }

      if (!data.success) {
        setFormError(data.error);
        setFormSuccess(data.success);
        setFormMessage(data.message);
      }
    } catch (error) {
      // console.log("handleSubmit error:", error);
      setFormSuccess(false);
      setFormError(true);
      setFormMessage("HANDLE SUBMIT CATCH ERROR");
    }
    setFormLoading(false);
  }

  return (
    <div className="add-video-container">
      <div className="add-video-image-container">
        <img src="images/add.png" alt="" className="add-video-image" />
      </div>
      <form onSubmit={handleSubmit} className="add-video-form">
        <fieldset className="add-video-form-fieldset">
          <legend className="add-video-form-legend">Add A New Video:</legend>
          <div className="add-video-form-group-container">
            <label
              htmlFor="add-video-form-url"
              className="add-video-form-label"
            >
              URL
            </label>
            <input
              type="text"
              name="url"
              id="add-video-form-url"
              className="add-video-form-input"
              // regex for https://www.youtube.com/embed/ followed by 11 characters
              // pattern="^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$"
              onChange={(event) => setFormUrl(event.target.value)}
              ref={formInputUrl}
            />
          </div>
          {/* <label htmlFor="add-video-form-title" className="add-video-form-label">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="add-video-form-title"
          className="add-video-form-input"
          // regex for non empty string
          // pattern="^.+$"
          onChange={(event) => setFormTitle(event.target.value)}
        /> */}
        </fieldset>
        <input
          type="submit"
          value="Add"
          disabled={formLoading}
          className="add-video-form-submit"
        />
        <div className="add-video-form-information">
          {formLoading && (
            <p className="add-video-form-loading">Adding Video...</p>
          )}
          {formSuccess && (
            <p className="add-video-form-success">Success: {formMessage}</p>
          )}
          {formError && (
            <p className="add-video-form-error">Error: {formMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
