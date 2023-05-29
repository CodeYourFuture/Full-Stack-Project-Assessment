function handleDeleteVideo(videoID) {
    
    fetch(`http://localhost:5000/video/${videoID}`, {
      method: "DELETE",
      headers: {
        Content_Type: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${videoID} could not be found`);
        }
        console.log(response);
        getAllVideos();
      })
      .catch((error) => console.log(error));
  }

  return (