import React, { useEffect, useState } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        if (res.status <= 200) {
          return res.json();
        } else {
          throw new Error(`Error ${res.status} ${res.statusText}`);
        }
      })
      .then((data) => {
        setVideos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {console.log(videos)}
      Vids
    </div>
  );
};

export default VideoList;
