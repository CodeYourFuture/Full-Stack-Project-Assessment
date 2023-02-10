import React, { useEffect, useState } from "react";
import AddVideoHeader from "./AddVideoHeader";
import Video from "./Video";
import Form from "./Form";
import axios from "axios";

export default function Main() {
  const [displayForm, setDisplayForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addFormData, setAddFormData] = useState({
    title: "",
    url: "",
    rating: 0,
  });
  const path = "https://youtube-video-loader.herokuapp.com/";

  const getData = () => {
    axios
      .get(path)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }; //getData() to display fetched data

  useEffect(() => {
    getData();
    setLoading(false);
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
      .post(path, newVideo)
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
      const newVideos = [newVideo, ...videos];
      //console.log(newVideos);
      setVideos(newVideos);
      alert("new video added");
    } else {
      alert("invalid Youtube url");
    }
  };

  const handleDeleteClick = (videoId) => {
    axios
      .delete(`${path}${videoId}`)
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
        {loading && <h3>Loading...</h3>}
        <Video videos={videos} handleDeleteClick={handleDeleteClick} />
      </div>
    </div>
  );
}
