import React, { useState } from 'react';
import "./App.css";
import videos from '../src/data';
import Header from '../src/components/Header';
import Add from '../src/components/Add';
import Card from '../src/components/Card';
import Footer from './components/Footer';

function createCard(video, delete2) {
  return (
    <Card

      clicked={delete2}
      key={video.id}
      id={video.id}
      name={video.title}
      url={video.url}
      rating={video.rating}
    />
  );
}


function App() {

  const [vid, setVid] = useState(videos);
  const [search, setSearch] = useState('');


  const deleteVid = (id) => {
    console.log(id);
    const index = vid.findIndex(item => item.id === id)
    setVid([...vid.slice(0, index), ...vid.slice(index + 1)])
  }

  function addVid(newVid) {
    setVid(prevVid => {
      return [newVid, ...prevVid];
    })
  }


  return (
    <div className="App">

      <Header handleSearch={setSearch} />

      <Add onAdd={addVid} />

      <div className="main-container">

        {vid.filter((video) => video.title.toLowerCase().includes(search)).map(item => createCard(item, deleteVid))}


      </div>

      <div className='footer'>
        <Footer />
      </div>

    </div>
  );
}

export default App;
