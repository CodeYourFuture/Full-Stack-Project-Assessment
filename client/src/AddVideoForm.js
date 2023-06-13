import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function AddVideoForm({ onAddVideo, fetchVideos, handleToggleVideos }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [filledForm, setFilledForm] = useState(null);
  const [errorMsgPopUp, setErrorMsgPopUp] = useState(false);
  const [showVideosOnLoad, setShowVideosOnLoad] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!genre || !title || !url) {
      setErrorMsgPopUp(true);
      return;
    }

    fetch("http://localhost:5000/videos/addnew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genre: genre,
        title: title,
        url: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setFilledForm(data.message);
        fetchVideos();
        setTitle("");
        setUrl("");
        setGenre("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "genre") {
      setGenre(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "url") {
      setUrl(value);
    }
  }

  function handleErrorMsgPopup() {
    setErrorMsgPopUp(false);
  }

  return (
    <div>
        {filledForm && <p>{filledForm}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Genre:
            <select name="genre" value={genre} onChange={handleInputChange}>
              <option value="">Please Select Video Genre</option>
              <option value="beauty">Beauty</option>
              <option value="coding">Coding</option>
              <option value="fashion">Fashion</option>
            </select>
          </label>

          <br />
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </label>

          <br />
          <label>
            URL:
            <input
              type="url"
              name="url"
              value={url}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit" className="submit">
            Add Video
          </button>
        </form>

      {/* Modal form for displaying error message */}
      <Modal
        show={errorMsgPopUp}
        onHide={handleErrorMsgPopup}
        className="custom-modal"
      >
        <Modal.Header>
          <Modal.Title>Error Submitting Video..!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please FILL in ALL required AREAS to proceed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorMsgPopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showVideosOnLoad && <div>{}</div>}
    </div>
  );
}

export default AddVideoForm;
