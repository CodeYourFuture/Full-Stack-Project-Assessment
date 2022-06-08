import React from "react";
import videosData from "./exampleresponse.json";

function VideoCards() {
     
    return(
        <div className="videocards">
            {videosData.map((videoObj, index) => {
                const videoUrl = videoObj.url.replace('watch?v=', 'embed/');
                return (
                  /* video contents */
                  <div key={index} className="card-container">
                    {/* video title */}
                    <div className="card-title">
                      <h3>{videoObj.title}</h3>
                    </div>

                    {/* embedded video */}
                    <div className="video-container">
                      <iframe
                        width="853"
                        height="480"
                        src={videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </div>

                    {/* no of votes */}
                    <div className="no-of-votes-for-video">
                      <p>0 votes</p>
                    </div>

                    {/* delete button */}
                    <div className="delete-button-container">
                      <button className="delete-button">Remove</button>
                    </div>

                    {/* up vote button */}
                    <div className="upvote-button-container">
                      <button className="upvote-button">upvote</button>
                    </div>

                    {/* down vote button */}
                    <div className="downvote-button-container">
                      <button className="downvote-button">downvote</button>
                    </div>
                  </div>
                );
            })}
        </div>
    );
}

export default VideoCards;