import { useState } from "react";
import AddVideo from "./AddVideo";

const VideoDisplay = (prop) => {
  const [allvideos, setAllVideos] = useState(prop.video);
  const inputVideo = (newvideo) => {
    setAllVideos([...allvideos].concat(newvideo));
  };

  const [voteCount, setVoteCount] = useState(0);

  const upVotes = () => {
    setVoteCount(voteCount + 1);
  };
  const downVotes = () => {
    setVoteCount(voteCount - 1);
  };
  const deleteVideo = (id) => {
    setAllVideos([...allvideos].filter((video, index) => id !== video.id));
  };

  return (
    <div className="render">
      <div>
        <AddVideo onClick={inputVideo} />
      </div>{" "}
      <div className="videos">
        {[...allvideos]
          .sort((a, b) => b.rating - a.rating)
          .map((videos, index) => {
            let idIndicator = videos.url.indexOf("=");
            let id = videos.url.substr(idIndicator + 1, videos.url.length);
            return (
              <ul key={index} style={{}} className="Video-display">
                <li>{videos.title} </li>
                <li>
                  <i onClick={() => upVotes()} className="fas fa-thumbs-up"></i>
                  <pre> </pre>
                  {videos.rating + voteCount}
                  <pre> </pre>
                  <i
                    onClick={() => downVotes()}
                    className="fas fa-thumbs-down"
                  ></i>
                </li>

                <li>
                  <iframe
                    title={`${videos.title}`}
                    width="460"
                    height="415"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </li>
                <li>On {videos.date}</li>
                <li>At {videos.time}</li>

                <li>
                  <button
                    onClick={() => {
                      deleteVideo(videos.id);
                    }}
                  >
                    {" "}
                    delete{" "}
                  </button>
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default VideoDisplay;
