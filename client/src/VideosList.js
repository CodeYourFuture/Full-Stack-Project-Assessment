import React from "react";

const VideosList = ({videoData}) => {
    console.log(videoData)
    const videoIdExtract = (url) =>{
        var regExp =
          /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
          return match[2];
        } else {
          //error
        }
    }

    videoData.sort((a, b) => b.rating - a.rating);

    

    return (
      <div>
        {videoData          
          .map((item) => {
            return (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>Rating: {item.rating}</p>
                <div><button onClick={()=>item.rating+1}>Upvote</button><button onClick={()=>item.rating-1}>Downvote{console.log(item.rating)}</button></div>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoIdExtract(
                    item.url
                  )}`}
                  title="YouTube video player"
                  frameBorder=""
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
      </div>
    );
}

export default VideosList;