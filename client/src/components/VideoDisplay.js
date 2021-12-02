import { useState,useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo"

const VideoDisplay = (prop) => {
  const getv = prop.getVideos;
  const [allvideos, setAllVideos] = useState([]);
  const [searched, setsearchedVideos] = useState([]);
       let [voting, setVoting] = useState(0);

  const inputVideo = (newvideo) => {
    //setAllVideos([...allvideos].concat(newvideo));
    //setsearchedVideos([...allvideos].concat
    //(newvideo));
    setAllVideos(newvideo)
  };
  useEffect(() => {
    let o;
    if (prop.order === true) o = "asc";
    else {
      o = "";
    }
    fetch(`http://127.0.0.1:5000/?order=${o}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAllVideos(data);
          setsearchedVideos(data);        
        }
      })
      .catch((e) => console.log(e));
  }, [prop.order]);
  const onsearch = (newvideo) => {
    setAllVideos(newvideo);
  };
  
 

  const upVotes = (id) => {
    [...allvideos].filter((video, index) => {
      if (id === video.id) {
        let p = document.getElementById(id);
        console.log(p.innerText)
        setVoting(video.rating += 1);
        p.innerText = voting;
      }
    })
   
  };
  const downVotes = (id) => {
    [...allvideos].filter((video, index) => {
      if (id === video.id)
      {
        let p = document.getElementById(id);
        console.log(p.innerText);
        setVoting((video.rating -= 1));
        p.innerText = voting;
      }
    })
   
  };
  const deleteVideo = (id) => {
    //setAllVideos([...allvideos].filter((video, index) => id !== video.id));

    fetch(`http://127.0.0.1:5000/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((newVideos) => {
       
        setAllVideos(newVideos);
      })
      .catch((error) => error);
  };

  return (
    <div className="render">
      <div>
        <AddVideo  input={inputVideo}/>
        <SearchVideo videos={searched} onClick={onsearch} />
      </div>{" "}
      <div className="videos">
        {[...allvideos]
          //.sort((a, b) => b.rating - a.rating)
          .map((videos, index) => {
           // setVoting(videos.rating);
            let idIndicator = videos.url.indexOf("=");
            let id = videos.url.substr(videos.url.length-11, videos.url.length);
            return (
              <ul key={index} style={{}} className="Video-display">
                <li>{videos.title} </li>
                <li>
                  <i
                    onClick={() => upVotes(videos.id)}
                    className="fas fa-thumbs-up"
                  ></i>
                  <pre> </pre>
                  <p id={videos.id}>{videos.rating}</p>
                  {/* //{videos.rating + voting} */}
                  <pre> </pre>

                  <i
                    onClick={() => downVotes(videos.id)}
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
