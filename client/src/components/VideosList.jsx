import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
import Search from "./Search";

function VideosList() {
  const [ videos, setVideos ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ searchResult, setSearchResult ] = useState([]);

  const fetchVideosUrl = 'http://13.53.198.163:5050';

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch(`${fetchVideosUrl}/videos`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setSearchResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const newVideo = (newInput) => {
    newInput.id = videos.length + 1;
    newInput.rating = 0;
    fetch(`${fetchVideosUrl}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(newInput),
    })
      .then((res) => {
        if (res.ok) {
          setVideos([ ...videos, newInput ]);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong");
      });
  };

  const deleteVideoItem = (videoId) => {
    fetch(`${fetchVideosUrl}/videos/${videoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
      },
    })
      .then((res) => {
        if (res.ok) {
          const videoDeleted = videos.filter((el) => el.id !== videoId);
          setVideos(videoDeleted);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong");
      });
  };

  const searchByName = (search) => {
    fetch(`${fetchVideosUrl}/videos?search=${search}`, {
      method: "GET",
      headers: { "Content-Type": "application/JSON" },
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong");
      });
  };

  const sortedVideos = [ ...videos ].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <div className="header">
        <Search onSearch={searchByName} />
        <AddVideo onVidAdd={newVideo} />
      </div>
      <div className="container mt-5">
        {searchResult.length > 0 ? (
          searchResult.map((video) => (
            <Video
              videoObj={video}
              key={video.id}
              deleteVideo={deleteVideoItem}
            />
          ))
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          sortedVideos.map((video) => (
            <Video
              videoObj={video}
              key={video.id}
              deleteVideo={deleteVideoItem}
            />
          ))
        )}
      </div>
    </>
  );
}

export default VideosList;