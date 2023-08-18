import { useEffect, useState } from "react";
import  React from "react";
import ShowVideos from "./ShowVideos";

function Videos(props) {

   const [loadData,setLoadData] = useState([]);
    const[titleData,setTitleData] = useState();
    const [urlData, setUrlData] = useState();

    useEffect(()=>{const getData = async () => {
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
    };getData()},[setLoadData])


    function cancelBtnHandler(e){
      e.preventDefault();
      props.setShow(false);
    }


    function addClickHandeler(e) {

      e.preventDefault();
      const newVideo = {  title: titleData, url: urlData };
fetch("http://localhost:3000/videos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newVideo),
})
  .then((response) => response.json())
  .then((data) => {
    setLoadData((prevLoadData) => [...prevLoadData, newVideo]);
    setTitleData("");
    setUrlData("");
  })
  .catch((error) => {
    console.error("Error adding video:", error);
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
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
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
            <button onClick={cancelBtnHandler}>
              Cancel
            </button>
            <button type="submit">
              Add
            </button>
          </div>
        </form>
      )}
    </>
  );  
}
export default Videos;