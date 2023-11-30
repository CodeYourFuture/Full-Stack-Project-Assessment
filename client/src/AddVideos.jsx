import React, { useState } from "react";

function AddVideos({ getAllVideos }) {
  const [toggleArea, setToggleArea] = useState(false);

  const toggleShow = () => setToggleArea((s) => !s);

  const initialState = {
    title: "",
    url: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [handleError, setHandleError] = useState(null);

  const [handleSuccess, setHandleSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: formData.title,
      url: formData.url,
    };

    try {
      await postRequest(data);
      getAllVideos();
      setFormData(initialState);
      setHandleError(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function postRequest(data) {
    try {
      const response = await fetch(
        "https://video-server-1vzq.onrender.com/video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const result = await response.json();
      console.log("Success:", result);
      setHandleSuccess(result.message);
      setHandleError(result.error);
      setFormData(initialState);
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <section>
        <button onClick={toggleShow} className="click-btn btn">
          {toggleArea ? "Close" : "Click for submission form"}
        </button>
      </section>
      {toggleArea && (
        <section className="submit">
          {handleError ? (
            <div>
              <p className="submit-msg">ALERT: {handleError}</p>
              <section>
                <form method="post" onSubmit={handleSubmit}>
                  <legend>Video Submission</legend>
                  <section className="title-url">
                    <label htmlFor="title">Enter title: </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </section>
                  <section className="title-url">
                    <label htmlFor="url">Enter URL: </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </section>
                  <button type="submit" className="click-btn btn">
                    Add Video
                  </button>
                </form>
              </section>
            </div>
          ) : (
            <section>
              {handleSuccess && (
                <p className="submit-success">{handleSuccess}</p>
              )}
              <form method="post" onSubmit={handleSubmit}>
                <legend>Video Submission</legend>
                <section className="title-url">
                  <label htmlFor="title">Enter title: </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </section>
                <section className="title-url">
                  <label htmlFor="url">Enter URL: </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </section>
                <button type="submit" className="click-btn btn">
                  Add Video
                </button>
              </form>
            </section>
          )}
        </section>
      )}
    </div>
  );
}

export default AddVideos;
