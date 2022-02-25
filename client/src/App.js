import "./App.css";
import Header from './components/Header';
import Vids from './components/Vids';
//import ExampleResponse from './components/exampleresponse.json';
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
    const getVideos = async () => {
      const videosFromServer = await fetchVideos()
      setVideos(videosFromServer)
    }

    getVideos()
  }, [])

    const fetchVideos = async () => {
      const res = await fetch("http://127.0.0.1:5000/")
      if (res.ok) {
        var data = await res.json()
      } else {
        throw new Error(res.status);
      }
      
      return data
    }
    

    /*const fetchVideos = async () => {
      const res = await fetch("http://127.0.0.1:5000/", {
        method: 'GET'
      })
      if (res.ok) {
        var data = await res.json()
      } else {
        throw new Error(res.status);
      }
      
      return data;
    }*/

    /*const fetchVideo = async (id) => {
      const res = await fetch(`http://127.0.0.1:5000/${id}`)
      if (res.ok) {
        var data = await res.json()
      } else {
        throw new Error(res.status);
      }
      
      return data
    }*/

  /*useEffect(() => {
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
  }, [some]);*/


  /*const addVideo = (vid) => {
    if (videos.some(item => item.url === vid.url)) {
      alert('Video already exist, add another video')
      return
    }
    const id = Math.floor(Math.random() * 10000) + 1
    const rating = 0;
    const newVideo = { id, rating, ...vid }
    setVideos([...videos, newVideo])
  }*/

  const addVideo = async (vid) => {
   if (videos.some(item => item.url === vid.url)) {
      alert('Video already exist, add another video')
      return
    } else {
    const res = await fetch(`http://127.0.0.1:5000/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(vid),
    })

    const data = await res.json()
      setVideos([ ...videos, {...vid, id: data.id, rating: 0}]);
      //window.location.reload(false);
    }
  }

  /*const deleteVideo = (id) => {
    const deletedVideo = videos.filter(item => item.id !== id);
    setVideos(deletedVideo);
  }*/
  const updateRating = async (id, newRating) => {
    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({rating: newRating})
    })
    setVideos(videos.map(item =>
      item.id === id ? {...item, rating: newRating} : item
      ));
  }

  const deleteVideo = async (id) => {
    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: 'DELETE'
    })

    const deletedVideo = videos.filter(item => item.id !== id);
    setVideos(deletedVideo);
  }

  return (
    <div className="App align-items-center">
      <Header className='App' onAdd={() => setShowAddVideo(!showAddVideo)} showAdd={showAddVideo} />
      {showAddVideo && <AddVideo onAdd={addVideo}/>}
      {videos.length > 0 ? (
      <Vids videos={videos} deleteVideo={deleteVideo} updateRating={updateRating}/>) : (<h1>No videos in the list</h1>)
      }
      </div>
  );
}
//<iframe width="560" height="315" src="https://www.youtube.com/embed/kBG-RnZU2cQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
export default App;
