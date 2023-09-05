import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
function Videos(props) {
  const [loadData, setLoadData] = useState([]);
  const [titleData, setTitleData] = useState("");
  const [urlData, setUrlData] = useState("");

  // fetch("http://localhost:3000/videos")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return setLoadData(data);
  //   });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/videos");
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();

        return setLoadData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  function cancelBtnHandler(e) {
    props.setShow(false);
  }

  function addClickHandeler(e) {
    e.preventDefault();
    const newVideo = { title: titleData, url: urlData};

    //adding video
    fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoadData(data);

        setTitleData("");
        setUrlData("");
      })
      .catch((error) => {
        console.error("Error adding video:", error);
      });
  }

  //deleting video
  function deleteBtnHandler(item) {
    const deletevideo = {
      id: item.id,
      title: item.title,
      url: item.url,
    };

    fetch(`http://localhost:3000/videos/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletevideo),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = loadData.filter((video) => video.id !== item.id);
        setLoadData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  }

  function thumbUpHandeler(item) {
    const newRating = item.rating + 1; // Increment the rating locally

    const newVideo = {
      id: item.id,
      title: item.title,
      url: item.url,
      rating: newRating, // Use the updated rating
    };

    fetch(`http://localhost:3000/videos/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        
        const updatedData = loadData.map((video) => {
          if (video.id === item.id) {
            return { ...video, rating: newRating }; 
          }
          return video;
        });
console.log(updatedData);
        setLoadData(updatedData); 
      })
      .catch((error) => {
        console.error("Error updating video:", error);
      });
  }


  function thumbDownHandeler(item) {
    const newRating = item.rating - 1;
    const newVideo = {
      id: item.id,
      title: item.title,
      url: item.url,
      rating: newRating,
    };
    
    fetch(`http://localhost:3000/videos/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = loadData.map((video)=>{
          if(video.id===item.id){
            return {...video,rating:newRating}
          }
          return video;
        })
        setLoadData(updatedData);
      });
  }

  return (
    <>
      <div className="main">
        {props.show && (
          <form className="formDiv" onSubmit={addClickHandeler}>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                style={{ marginLeft: 10, borderRadius: 5 }}
                id="title"
                value={titleData}
                onChange={(e) => {
                  setTitleData(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="url">Url</label>
              <input
                style={{ marginLeft: 10, borderRadius: 5 }}
                id="url"
                value={urlData}
                onChange={(e) => setUrlData(e.target.value)}
                required
              />
            </div>

            <div className="addCancelBtn">
              <button  style={{borderRadius:5}} type="button" onClick={cancelBtnHandler}>
                Cancel
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        )}
        <div className="mainShowVideos">
          {loadData.length > 0 ? (
            loadData.map((item, index) => {
              const videoId = item.url.split("v=")[1];
              return (
                <div key={index} className="showVideo">
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    <button
                      className="thumbBtn"
                      onClick={() => thumbUpHandeler(item)}
                    >
                      <ThumbUpIcon />
                    </button>
                    <p style={{ margin: 5 }}>{item.title}</p>
                    <button
                      className="thumbBtn"
                      onClick={() => thumbDownHandeler(item)}
                    >
                      <ThumbDownIcon />
                    </button>
                  </div>
                  <p style={{ color: "gray",textDecoration:"underline" }}>{item.rating}</p>

                  <iframe
                    width="350"
                    height="200"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                  <button
                    className="btnShowVideo"
                    onClick={() => deleteBtnHandler(item)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <p>No video yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default Videos;
