import React, { useState } from "react";

function AddVideos({ setVideos }) {
  const [toggleArea, setToggleArea] = useState(false);

  const toggleShow = () => setToggleArea((s) => !s);

  const initialState = {
    title: "",
    url: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [handleError, setHandleError] = useState(null);

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   let randomID = Math.floor(100000 + Math.random() * 900000);

  //   const newVideo = {
  //     id: randomID,
  //     title: formData.title,
  //     url: formData.url,
  //     rating: formData.rating,
  //   };
  //   setVideos((prevVideos) => [...prevVideos, newVideo]);
  //   setFormData(initialState);
  // }

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
        // if (!response.ok) {
        //   throw new Error("Failed to add video");
        // }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          setHandleError(data.message);
        } else {
          console.log("Success:", data);
          setVideos(data);
          setFormData(initialState);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  // return (
  //   <div>
  //     {handleError ? (
  //       <div>
  //         <p>{handleError}</p>
  //         <div className="container">
  //           <form onSubmit={handleSubmit} className="booking-form">
  //             <input
  //               id="title"
  //               placeholder="Title"
  //               type="text"
  //               className="form-control"
  //               value={formData.title}
  //               name="title"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="first"
  //               placeholder="Enter first name"
  //               type="text"
  //               className="form-control"
  //               value={formData.firstName}
  //               name="firstName"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="last"
  //               placeholder="Enter surname"
  //               type="text"
  //               className="form-control"
  //               value={formData.surname}
  //               name="surname"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="email"
  //               placeholder="Enter email"
  //               type="email"
  //               className="form-control"
  //               value={formData.email}
  //               name="email"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="room-id"
  //               placeholder="Enter Room ID"
  //               type="number"
  //               className="form-control"
  //               value={formData.roomId}
  //               name="roomId"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="check-in"
  //               placeholder="Check-in date"
  //               type="date"
  //               className="form-control"
  //               value={formData.checkInDate}
  //               name="checkInDate"
  //               onChange={handleInputChange}
  //             />
  //             <input
  //               id="check-out"
  //               placeholder="Check-out date"
  //               type="date"
  //               className="form-control"
  //               value={formData.checkOutDate}
  //               name="checkOutDate"
  //               onChange={handleInputChange}
  //             />
  //           </form>
  //           <button
  //             id="submit-form"
  //             className="btn btn-primary"
  //             type="submit"
  //             onClick={handleSubmit}
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="container">
  //         <form onSubmit={handleSubmit} className="booking-form">
  //           <input
  //             id="title"
  //             placeholder="Title"
  //             type="text"
  //             className="form-control"
  //             value={formData.title}
  //             name="title"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="first"
  //             placeholder="Enter first name"
  //             type="text"
  //             className="form-control"
  //             value={formData.firstName}
  //             name="firstName"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="last"
  //             placeholder="Enter surname"
  //             type="text"
  //             className="form-control"
  //             value={formData.surname}
  //             name="surname"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="email"
  //             placeholder="Enter email"
  //             type="email"
  //             className="form-control"
  //             value={formData.email}
  //             name="email"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="room-id"
  //             placeholder="Enter Room ID"
  //             type="number"
  //             className="form-control"
  //             value={formData.roomId}
  //             name="roomId"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="check-in"
  //             placeholder="Check-in date"
  //             type="date"
  //             className="form-control"
  //             value={formData.checkInDate}
  //             name="checkInDate"
  //             onChange={handleInputChange}
  //           />
  //           <input
  //             id="check-out"
  //             placeholder="Check-out date"
  //             type="date"
  //             className="form-control"
  //             value={formData.checkOutDate}
  //             name="checkOutDate"
  //             onChange={handleInputChange}
  //           />
  //         </form>
  //         <button
  //           id="submit-form"
  //           className="btn btn-primary"
  //           type="submit"
  //           onClick={handleSubmit}
  //         >
  //           Submit
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div>
      <section>
        <button onClick={toggleShow}>Click for form to add video</button>
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
                  <button type="submit">Add Video</button>
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
                <button type="submit">Add Video</button>
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
