import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewVivdeo({ setRefreshVideos }) {
  const rundomId = uuidv4();
  const [formData, setFormData] = useState({
    id: rundomId,
    title: "",
    url: "",
    rating: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();

    // const formData = new FormData(event.target);

    // const newData = {
    //   from: formData.get("from"),
    //   text: formData.get("text"),
    // };
    // console.log("handleSubmit newData:", newData);
    //http://localhost:4000/bookings
    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:4500/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(formData),
      });
      console.log("handleSubmit response:", response);

      const json = await response.json();
      console.log("handleSubmit json:", json);

      event.target.reset();

      setRefreshVideos((prevRefreshMessages) => !prevRefreshMessages);
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
