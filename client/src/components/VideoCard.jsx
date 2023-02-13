import React from "react";
import VideoVote from "./VideoVote";

export default function VideoCard({ data, setData }) {
  console.log(data, "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");

  const handelRemove = (id) => {
    const removeVideo = data.filter((video) => video.id !== id);
    console.log(removeVideo, "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
    setData(removeVideo);
  };
  return (
    <div className="flex-container m-2"  >
      {data.map((video) => {
        const videoId = video.url.substring(32);
        return (
          <>

            <div className="shadow-lg p-3 border mb-5 bg-body-tertiary rounded m-3 " >
              <h6>{video.title}</h6>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                
              ></iframe>
              <button
                type="button"
                class="btn btn-outline-danger"
                onClick={() => handelRemove(video.id)}
                >
                Delete
              </button>
                <VideoVote data={data} rating={video.rating}/>
            </div>
          </>
        );
      })}
    </div>
  );
}
