import React, { useEffect, useState } from "react";
import AddVideoHeader from "./AddVideoHeader";
import Video from "./Video";
import Form from "./Form";
import axios from "axios";

export default function Main() {
  const [displayForm, setDisplayForm] = useState(false);
  const [videos, setVideos] = useState([]);

  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
    rating: 0,
  });

  const getData = () => {
    axios.get("http://localhost:4000/").then((res) => {
      setVideos(res.data);
    });
  }; //getData() to display fetched data

  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => {
      //console.log(res);
      setVideos(res.data);
    });
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newVideo = {
      title: addFormData.title,
      url: addFormData.url,
      rating: addFormData.rating,
    };

    axios
      .post(`http://localhost:4000/`, newVideo)
      .then((res) => {
        if (res.status === 201) getData();
      })
      .catch((error) => console.log(error));

    const validateUrl = (url) => {
      const urlType =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(urlType)) {
        return url.match(urlType)[1];
      }
      return false;
    };

    if (validateUrl(newVideo.url)) {
      const newVideos = [...videos, newVideo];
      //console.log(newVideos);
      setVideos(newVideos);
    } else {
      alert("invalid Youtube url");
    }
  };

  const handleDeleteClick = (videoId) => {
    axios
      .delete(`http://localhost:4000/${videoId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) getData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <AddVideoHeader setDisplayForm={setDisplayForm} />
      {displayForm ? (
        <Form
          setDisplayForm={setDisplayForm}
          handleAddFormSubmit={handleAddFormSubmit}
          handleAddFormChange={handleAddFormChange}
        />
      ) : (
        ""
      )}
      <div className="sub-container">
        <Video videos={videos} handleDeleteClick={handleDeleteClick} />
      </div>
    </div>
  );
}
