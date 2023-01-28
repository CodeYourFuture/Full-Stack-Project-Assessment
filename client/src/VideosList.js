import React from "react";
import VoteButton from "./VoteButton";
import DeleteButton from "./DeleteButton";
import "./App.css";


const VideosList = ({videoData, setVideoData }) => {
    console.log(videoData)
    const videoIdExtract = (url) =>{
        var regExp =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length === 11) {
          return match[7];
        } else {
          //error
        }
    }
    videoData.sort((a, b) => b.rating - a.rating);
    return (
      <div >
        {videoData          
          .map((item) => {
            return (
              <div key={item.id} className="Video-object">
                <h6>{item.title}</h6>
                <VoteButton item={item} />
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoIdExtract(
                    item.url
                  )}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <DeleteButton
                  item={item}
                  videoData={videoData}
                  setVideoData={setVideoData}
                />
              </div>
            );
          })}
      </div>
    );
}

export default VideosList;