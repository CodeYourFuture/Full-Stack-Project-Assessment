import React, {useState} from 'react';



function SingleVideo({item, deleteVideo}) {
 const [counter, setCounter] = useState(item.rating);


     function increment() {
       setCounter((counter) => counter + 1);
     }

     function decrement() {
       setCounter((counter) => counter - 1);
     }


    return (
      <div className="cards" key={item.id}>
        <h3>{item.title}</h3>
        <div id={item.id} className="vote-for-video">
          <i className="fa fa-thumbs-o-up upVotes" onClick={increment}></i>
          <p>Votes: {counter}</p>
          <i className="fa fa-thumbs-o-down downVotes" onClick={decrement}></i>
        </div>
        <iframe
          width="315"
          height="315"
          src={item.url.replace("watch?v=", "embed/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <button onClick={() => deleteVideo(item.id)}>Delete</button>
      </div>
    );
}

export default SingleVideo;
