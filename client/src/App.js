import {React, useState, useEffect} from "react";
import "./App.css";
// import videosFromData from "./exampleresponse.json";
import SingleVid from "./components/EachVideo/singleVid";
import AddVideo from "./components/AddVideo/addVideo";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function App() {
  

  const particlesLoaded = (container) => {
    console.log(container);
  };

  
  


  const [videos, setVideos] = useState([]);
  const [newVidUrl, setNewVidUrl] = useState('');
  const [newVidTitle, setNewVidTitle] = useState(''); 
  const [newVidId, setNewVidId] = useState(0); 
  
  
  useEffect(() =>{
    fetch('http://localhost:8000/')
    .then(resp => resp.json())
    .then(data => setVideos(data))
  }, [])
    
   function removeVideo(id) {
    const filteredVideos = videos.filter(vid => {
      return vid.video_id !== id
    })
    setVideos(filteredVideos)

  }

  function handleNewVidUrl(e) {
    e.preventDefault()
    
    setNewVidUrl(e.target.value);
      
  }

  function handleNewVidTitle(e) {
    e.preventDefault()
    console.log(e.target.value)
    setNewVidTitle(e.target.value);
    
    
  }

  function addVideo(e) {
    e.preventDefault();
    const newlyAddedVideo = {}
    setNewVidId(videos.length+1)
    newlyAddedVideo.video_id = newVidId;
    newlyAddedVideo.video_title = newVidTitle;
    newlyAddedVideo.video_url = newVidUrl;
    newlyAddedVideo.video_rating = 0

    
    let newData = [...videos, newlyAddedVideo]
    setVideos(newData)
    console.log(videos)
    // alert('Your video has been added to the end of list')
    
  }
  
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  return (
    <div className="App">
      <header>
        <h1>Video Recommendation</h1>
        <AddVideo 
          addVideo={addVideo} handleNewVidTitle={handleNewVidTitle} handleNewVidUrl={handleNewVidUrl}
        />
      </header>
      <main>
        {videos.map(video => {
          console.log(video.video_id)
          return (
            <SingleVid key={video.video_id} id={video.video_id} title={video.video_title} url={video.video_url.replace('watch?v=','embed/')} ratingFromData={video.video_rating} removeVideo={removeVideo} />
          )
        })}
      </main>
        <Particles
        className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d40a1",
            },
          },
          fpsLimit: 1200,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
         
      />
      
    </div>
  );
}

export default App;
