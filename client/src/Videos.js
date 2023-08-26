import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
function Videos(props) {
  const [loadData, setLoadData] = useState([]);
  const [titleData, setTitleData] = useState("");
  const [urlData, setUrlData] = useState("");
const [id,setId] = useState('');
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
    //adding video
    fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
function deleteBtnHandler(item) {
  const deletevideo = {
    id: item.id,
    title: item.title,
    url: item.url,
  };
//deleting video
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


function thumbUpHandeler(item) {
  console.log(item);
 // ?????????
  const newVideo = 
  {
    id:item.id,
  title:item.title,
  url:item.url,
  rating:item.rating
  //?????????
  }
fetch(`http://localhost:3000/videos/:${item.id}`,{
  
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newVideo),
      
    })
.then((promis)=>promis.json())
.then((data)=>{
  console.log();
  console.log("increase");
  setLoadData(data);
})
}

function thumbDownHandeler() {}


  
  return (
    <>
      <div className="main">
        {props.show && (
          <form className="formDiv" onSubmit={addClickHandeler}>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={titleData}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTitleData(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="url">Url</label>
              <input
                id="url"
                value={urlData}
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
        <div className="mainShowVideos">
          {loadData.length > 0 ? (
            loadData.map((item) => {
              const videoId = item.url.split("v=")[1]; 
             return (
               <div key={item.id} className="showVideo">
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
                     onClick={() => thumbDownHandeler(item.id)}
                   >
                     <ThumbDownIcon />
                   </button>
                 </div>
                 <p>{item.rating}</p>
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
