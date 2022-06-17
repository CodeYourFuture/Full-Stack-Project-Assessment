import React, { useState} from "react";
import "./App.css";
const AddVideo = () => {
  const [visibility, setVisibility] = useState("addingOptionHidden");
  const [clicked, setClicked] = useState(true);
  const [urlValue, setUrlValue] = useState("");
  const [title, setTitle] = useState("");
  const eventHandler = () => {
    setClicked(!clicked);
    !clicked
      ? setVisibility("addingOptionHidden")
      : setVisibility("addingOptionVisible");
    setTitle("");
    setUrlValue("");
  };
  const setTitleHandler = (event) => {
    setTitle(event.target.value);
   
  };
  const setUrlValueHandler = (event) => {
    setUrlValue(event.target.value);
    
  };
  // useEffect(() => {
  //   // const data = { rating:  rate , id: props.ratingId };
  //   fetch("https://flannel-hickory-parallelogram.glitch.me/videos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data1) => {
  //       console.log("Success:", data1, rate);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [rate]);
  const addingVideo = () => {
    if (title === "") {
      alert("Title is empty!!");
    } else if (!urlValue.includes("youtube") || !urlValue.includes("watch")) {
      alert("Url is not valid!!");
    } else {
      const data = { url:urlValue , title : title , rate : 0}
       fetch("https://flannel-hickory-parallelogram.glitch.me/videos/add", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       })
         .then((response) => response.json())
         .then((data1) => {
           console.log("Success:", data1);
         })
         .catch((error) => {
           console.log(error);
         });
      alert("Video added");
      setUrlValue("");
      setTitle("");
    }
  };

  return (
    <div className="Add_Video">
      <button onClick={eventHandler}>Add Video</button>
      <div className={visibility}>
        <text>Title</text>
        <input
          value={title}
          onChange={(e) => {
            setTitleHandler(e);
          }}
        ></input>
        <text>URL</text>
        <input
          type="text"
          value={urlValue}
          onChange={(e) => {
            setUrlValueHandler(e);
          }}
        ></input>
        <button onClick={addingVideo}>Add</button>
      </div>
    </div>
  );
};

export default AddVideo;
