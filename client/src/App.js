import {React, useState} from "react";
import "./App.css";
import videosFromData from "./exampleresponse.json";
import SingleVid from "./components/EachVideo/singleVid";
import AddVideo from "./components/AddVideo/addVideo";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function App() {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  
  


  const [videos, setVideos] = useState(videosFromData);
  const [newVidUrl, setNewVidUrl] = useState('');
  const [newVidTitle, setNewVidTitle] = useState('');

  let [newlyAddedVideo, setNewlyAddedVideo] = useState({})
  
  function removeVideo(id) {
    const filteredVideos = videos.filter(vid => {
      return vid.id !== id
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
    newlyAddedVideo.title = newVidTitle;
    newlyAddedVideo.url = newVidUrl
    
    let newData = videos.concat(newlyAddedVideo)
    setVideos(newData)
    alert('Your video has been added to the end of list')
    
  }

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
          const embededVideo = video.url.replace('watch?v=', 'embed/');
          return (
            <SingleVid id={video.id} title={video.title} url={embededVideo} ratingFromData={video.rating} removeVideo={removeVideo} />
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
