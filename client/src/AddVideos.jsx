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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3005/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.title,
        url: formData.url,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        getAllVideos();
        setFormData(initialState);
        setHandleError(data.error);
      })
      .catch((error) => {
        console.log(error.error);
      });
  };

  function handleChange(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <section>
        <button onClick={toggleShow} className="click-btn btn">
          Click for submission form
        </button>
      </section>
      {toggleArea && (
        <section>
          {handleError ? (
            <div>
              <p>{handleError}</p>
              <section>
                <form method="post" onSubmit={handleSubmit}>
                  <legend>Video Submission</legend>
                  <section className="title-block">
                    <label htmlFor="title">Enter title: </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </section>
                  <section>
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
              <form method="post" onSubmit={handleSubmit}>
                <legend>Video Submission</legend>
                <section className="title-block">
                  <label htmlFor="title">Enter title: </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </section>
                <section>
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

  // return (
  //   <div>
  //     <button onClick={toggleShow}>Add Video</button>
  //     {toggleArea && (
  //       <form method="post" onSubmit={handleSubmit}>
  //         <legend>Video Submission</legend>
  //         <section className="title-block">
  //           <label htmlFor="title">Enter title: </label>
  //           <input
  //             type="text"
  //             id="title"
  //             name="title"
  //             value={formData.title}
  //             onChange={handleChange}
  //           />
  //         </section>
  //         <section>
  //           <label htmlFor="url">Enter URL: </label>
  //           <input
  //             type="url"
  //             id="url"
  //             name="url"
  //             value={formData.url}
  //             onChange={handleChange}
  //           />
  //         </section>
  //         <button type="submit">Add Video</button>
  //       </form>
  //     )}
  //   </div>
  // );
}

export default AddVideos;
