import React from "react";

const DeleteButton = ({item, videoData, setVideoData}) => {

    const deleteFunction = (e) => {
        e.preventDefault();
        const id = parseInt(item.id)
        // const index = videoData.findIndex((v) => v.id === id);
        // videoData.splice(index,1)
        // setVideoData(current=>current)
        // setVideoData(current => {
        //     current.splice(index,1)
        //     return current
        // })

        fetch(`/videos/${id}`, {
          method: "DELETE",          
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));

        const updateVideos = videoData.filter((video)=>
        video.id !==id)



        setVideoData(updateVideos)

        //  console.log(id)
        //  console.log(videoData)
    }

    return (
      <div>
        <button onClick={deleteFunction}>Delete</button>
      </div>
    );
}

export default DeleteButton