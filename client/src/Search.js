import "./App.css";
import React, { useState } from "react";

function Uploadvideo() {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  function isValidURL(url) {
    const pattern = /^(https?:\/\/)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/i;
    return pattern.test(url);
  }

  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      return alert("Title cannot be empty.");
    }

    // const currentDate = new Date();
    //const formattedDate = currentDate.toISOString();
    const urlParts = url.split("watch?");
    if (urlParts.length === 2) {
      const formData = {
        title: title,
        rating: 0,
        url: urlParts[0] + "embed/" + urlParts[1],
      };
      if (!isValidURL(formData.url)) {
        return alert("Please enter a valid URL.");
      }
      try {
        setSubmissionStatus("success");
      } catch (error) {
        setSubmissionStatus("error");
      }

      try {
        const response = await fetch("/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Form data submitted successfully");
        } else {
          console.error("Form data submission failed");
        }
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    } else {
      return alert("Please enter a valid url");
    }
  };

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    if (!showForm) {
      setShowForm(true);
    }
  };
  const handleCancelButtonClick = () => {
    if (showForm) {
      setShowForm(false);
      setSubmissionStatus(null);
    }
  };

  return (
    <div className="alignUpload">
      <button
        className="btn btn-light customBackground2"
        onClick={handleButtonClick}
      >
        Upload Video
      </button>
      {showForm && (
        <div className="container">
          {submissionStatus === "success" && (
            <p>Form submitted successfully!</p>
          )}
          {submissionStatus === "error" && (
            <p>There was an error submitting the form.</p>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                className="input"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label htmlFor="url">url:&nbsp;&nbsp;&nbsp;</label>
              <input
                id="url"
                value={url}
                className="input"
                type="text"
                name="url"
                onChange={(e) => setURL(e.target.value)}
                required
              ></input>
            </div>
            <div className="formBtn">
              <button
                className="btn btn-light cancelBtn"
                onClick={handleCancelButtonClick}
              >
                Cancel
              </button>
              <button className="btn btn-light uploadBtn" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
function Searchvideo() {
  
 
  return (
    <div className="searchAlign">
      <label htmlFor="searchid">Search:</label>
      <input
        id="searchid"
        type="text"
        className="searchVideo"
        
        placeholder="Search for video..."
        name="search"
      ></input>
    </div>
  );
}

export default function Search(inputValue) {
  return (
    <div className="search">
      <Uploadvideo />
      <Searchvideo />
    </div>
  );
}
