import "./App.css";
import { useState } from 'react';
import uuid from 'react-uuid';
import vidData from './exampleresponse.json';
import DisplayVideo from './DisplayVideo';
import AddVideo from './AddVideo';

function App() {
  const [videos, setVideos] = useState(vidData);
  
  function formSubmitClick(e) {
    e.preventDefault();
    const submissionTitle = e.target.elements.title.value;
    const submissionUrl = e.target.elements.url.value;

    setVideos([...videos, {
      "id": uuid(),
      "title": submissionTitle,
      "url": submissionUrl,
      rating: 0
    }]);

    let subTitle = document.getElementById('submissionTitle')
    subTitle.value ='';
    let subUrl = document.getElementById('submissionUrl')
    subUrl.value ='';

  }

  function upVoteClick(e) {
    const upVoteId = parseInt(e.target.id.slice(2));
    const updateVotes = videos.map(vid => {
      if (upVoteId === vid.id) {
        vid.rating++;
        return vid
      }
      return vid
    })
    setVideos(updateVotes);
  }

  function downVoteClick(e) {
    const downVoteId = parseInt(e.target.id.slice(4));
    const updateVotes = videos.map(vid => {
      if (downVoteId === vid.id) {
        vid.rating--;
        return vid
      }
      return vid
    })
    setVideos(updateVotes);
  }

  function deleteVideoClick(e){
    const selectedVideo = parseInt(e.target.id);
    console.log(selectedVideo);
    const updatedVideoList = videos.filter(vid => {
      if (vid.id === selectedVideo){
        return null 
      } 
      return vid
    }) 

    setVideos(updatedVideoList);
  }
  return (
    <div className="App container">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo submitClick={formSubmitClick}/>
      <div className="row">
      {videos.map(data => <DisplayVideo key={data.id} data={data} upVote={upVoteClick} downVote={downVoteClick} deleteClick={deleteVideoClick}/>)}
      </div>
    </div>
  );
}

export default App;
