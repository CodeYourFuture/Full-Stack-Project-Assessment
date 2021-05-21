import React, {useState} from 'react';

const DisplayVideo = ({filteredVideo}) => {
 const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter => counter+1);
  }

  function decrement() {
    setCounter(counter => counter-1);
  }

  function deleteVideo(item) {
    
    filteredVideo.filter(i => i !== item.id)
  }

    return (
      <div className="main-container">
         {filteredVideo.map((item, index) => (
          <div className="cards" key={index}>
            <h3>{item.title}</h3>
            <div className="vote-for-video">
                <i className="fa fa-thumbs-o-up upVotes" onClick={increment}></i>
                <p>{counter} Votes</p>
                <i className="fa fa-thumbs-o-down downVotes" onClick={decrement}></i>
            </div>
            <iframe width="560" height="315" src={item.url.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <br />

            <button onClick={deleteVideo}>Delete</button>
          </div>
        ))}
      </div>
    );
}

export default DisplayVideo;
