import { useState } from "react";

export default function NewVivdeo({ setRefreshVideos }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.title.trim() === "" || formData.url.trim() === "") {
      alert("Title and URL cannot be empty");
      return;
    }

    const formDataUrlChanged = {
      title: formData.title,
      url: `https://www.youtube-nocookie.com/embed/${
        formData.url.match(/v=([a-zA-Z0-9_-]{11})/)[1]
      }`,
    };
    // console.log(formDataUrlChanged);

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `https://kristinadudnyk-fullstack-project.onrender.com/video`,
        // "http://localhost:4500/video"
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(formDataUrlChanged),
        }
      );
      console.log("handleSubmit response:", response);

      const json = await response.json();
      console.log("handleSubmit json:", json);

      event.target.reset();

      setRefreshVideos((prevRefreshVideos) => !prevRefreshVideos);
    } catch (error) {
      console.log("handleSubmit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="new-video-container">
      <form className="form-for-new-video" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          required
        />
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
