import "./AddVideoForm.css";
import { useState } from "react";
import ReactSelect from "react-select";

const AddVideoForm = ({ categories, fetchVideos }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");

  // Create options array for ReactSelect from categories
  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));

  // Handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    // Validate title length
    if (title.length < 2) {
      setError("Please provide at least 3 characters in Title.");
    } else {
      setError("");
    }
  };

  // Handle category selection change
  const handleCategoryChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // Handle link input change
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title length
    if (title.length < 3) {
      setError("Please provide at least 3 characters.");
      return; // Prevent form submission
    }

    // Validate YouTube link format
    const youtubeLinkRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    if (!youtubeLinkRegex.test(link)) {
      setError("Wrong link. Please provide link to YouTube video.");
      return; // Prevent form submission
    }

    // Create new video object
    const newVideo = {
      title,
      category: selectedOption.value,
      url: link,
    };

    // Send POST request to add the new video
    fetch("https://video-server-wtvy.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchVideos();
      })
      .catch((error) => {
        console.error(error);
      });

    // Clear the form fields and error message
    setTitle("");
    setSelectedOption("");
    setLink("");
    setError("");
  };

  return (
    <div className="video_form">
      <h1>Add a video</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="selectMenu">Category</label>
          <div id="selectMenu">
            <ReactSelect
              options={options}
              value={selectedOption}
              onChange={handleCategoryChange}
              className="custom_select"
              isSearchable={false}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={handleLinkChange}
            required
          />
        </div>
        <button type="submit">Add Video</button>
      </form>
      <p className="error_message">{error}</p>
      <hr className="main_line"></hr>
    </div>
  );
};

export default AddVideoForm;
