import "./App.css";
import Header from './components/Header';
import Vids from './components/Vids';
import ExampleResponse from './components/exampleresponse.json';
import { useEffect, useState } from 'react';
import AddVideo from './components/AddVideo';
//import Vid from './components/Vid';

function App() {
  const [showAddVideo, setShowAddVideo] = useState(false);
  //const [videos, setVideos] = useState(ExampleResponse)
  const [videos, setVideos] = useState([]);

  /*const outsideUrl = "http://127.0.0.1/5000/"

  useEffect(()=> {
    const getVideos = async () => {
      const res = await fetch({outsideUrl});
      const data = await res.json();
      if(res.ok) {
      
      return setVideos(data);
      } else {
        throw new Error();
      }
    }
    getVideos();
  }, [])*/

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status);
    })
    .then((data) => {
      setVideos(data);
    })
    .catch((error) => console.log(error));
  }, []);

  /*useEffect(() => {
    const getVideos = async () => {
      const videosFromServer = await fetchVideos();
      setVideos(videosFromServer);
    }
    getVideos();
  }, []);

  const fetchVideos = async () => {
    try{
    const res = await fetch("http://127.0.0.1/5000/");
    if (res.status >= 200  && res.status <= 299) {
      var data = await res.json();
      console.log(data);
     } else {
      throw new Error(res.status);
    }
    const result = await data;
    console.log(result);
    return result;
  } catch(error) {
    console.log(error);
  }
  };*/

  const addVideo = (vid) => {
    if (videos.some(item => item.url === vid.url)) {
      alert('Video already exist, add another video')
      return
    }
    const id = Math.floor(Math.random() * 10000) + 1
    const rating = 0;
    const newVideo = { id, rating, ...vid }
    setVideos([...videos, newVideo])
  }

  const deleteVideo = (id) => {
    const deletedVideo = videos.filter(item => item.id !== id);
    setVideos(deletedVideo);
  }

  return (
    <div className="App align-items-center">
      <Header className='App' onAdd={() => setShowAddVideo(!showAddVideo)} showAdd={showAddVideo} />
      {showAddVideo && <AddVideo onAdd={addVideo}/>}
      {videos.length > 0 ? (
      <Vids videos={videos} deleteVideo={deleteVideo}/>) : (<h1>No videos in the list</h1>)
      }
      </div>
  );
}
//<iframe width="560" height="315" src="https://www.youtube.com/embed/kBG-RnZU2cQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
export default App;
