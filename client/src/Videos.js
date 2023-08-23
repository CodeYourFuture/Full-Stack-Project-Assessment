import React, { useEffect, useState } from "react";

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
  },[setLoadData]);

  function cancelBtnHandler(e) {
   
    props.setShow(false);
  }

  function addClickHandeler(e) {
    e.preventDefault();
    const newVideo = { title: titleData, url: urlData };
    
    fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newVideo),
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoadData(data);
        
        setTitleData("");
        setUrlData("");
      })
    .catch((error) => {
      console.error("Error adding video:", error);
    });
  }
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
      setLoadData(data);
    })
    .catch((error) => {
      console.error("Error deleting video:", error);
    });
}
  
  return (
    <>
      {props.show && (
        <form className="formDiv" onSubmit={addClickHandeler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              onChange={(e) => setTitleData(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="url">Url</label>
            <input
              id="url"
              onChange={(e) => setUrlData(e.target.value)}
              required
            />
          </div>

          <div className="addCancelBtn">
            <button type="button" onClick={cancelBtnHandler}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      )}
      {loadData.length > 0 ? (
        loadData.map((item) => (
          <div key={item.id}>
            <p style={{ margin: 5 }}>{item.title}</p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* <div className="showVideo">{item.url}</div> */}
            <button onClick={()=>deleteBtnHandler(item)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No video yet.</p>
      )}
    </>
  );
}
export default Videos;
