import "./AddVideoForm.css";
import { useState } from "react";
import ReactSelect from "react-select";

const AddVideoForm = ({ categories }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  let options = [];

  //adding values to the options array
  categories.forEach((category) => {
    const newOption = {};
    newOption.value = category;
    newOption.label = category;
    options.push(newOption);
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (title.length < 2) {
      setError("Please provide at least 3 characters in Title.");
    } else {
      setError("");
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length < 3) {
      setError("Please provide at least 3 characters.");
      return; // Prevent form submission
    }

    const youtubeLinkRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    if (!youtubeLinkRegex.test(link)) {
      setError("Wrong link. Please provide link to YouTube video.");
      return; // Prevent form submission
    }

    const newVideo = {
      title,
      selectedOption,
      link,
    };

    // Clear the form fields
    setTitle("");
    setSelectedOption("");
    setLink("");
    setError("");

    console.log(newVideo);
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
