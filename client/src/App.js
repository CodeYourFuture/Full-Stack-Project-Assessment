import React, { useState, useEffect } from "react";

// import SampleDate from "./SampleData/exempleresponse.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormDisabled from "./components/FormDisabled";
import Nav from "./components/Nav";
import ListVideos from "./components/ListVideos";

function App() {
  const [VideosInfo, setVideosInfo] = useState([]);
  const [load, isLoaded] = useState(false);
  const [searchVideos, setSearchVideos] = useState([]);

  useEffect(() => {
    console.log("working...")


    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setVideosInfo(data)
        isLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [load]);

  console.log(VideosInfo);

  const addVideo = (title, url) => {
    let newVideo = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      url: url,
      rating: Math.floor(Math.random() * 10000),
    };
    let updatedList = VideosInfo.concat(newVideo);
    setVideosInfo(updatedList);
  };

  // search prop function
  const search = (e) => {
    e.preventDefault();
    let searchQuery = e.target.value;
    console.log("searching:", searchQuery);

    const filteredResult = VideosInfo.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchVideos(filteredResult);
  };

  // remove a video prop function

  const removeVideo = (id) => {
    const videoCopy = [...VideosInfo];
    console.log(`removed video with id:${id}`);
    const index = videoCopy.findIndex((video) => {
      return video.id === id;
    });
    videoCopy.splice(index, 1);
    setVideosInfo(videoCopy);
  };

  // <AddVideo addVideo={addVideo} />

  return (
    <Router>
      <Nav />
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <Switch>
          <Route path='/' exact>
            {/* Home page content, including the ListVideos component and the FormDisabled component */}
            <ListVideos data={VideosInfo} delete={removeVideo} />
            <FormDisabled addVideo={addVideo} />
          </Route>
          <Route path='/form' component={FormDisabled} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
