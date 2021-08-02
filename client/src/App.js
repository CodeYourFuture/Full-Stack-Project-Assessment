import React, { useState } from 'react'
import data from './exampleresponse.json'
import {FaThumbsUp} from 'react-icons/fa'
import {FaThumbsDown} from 'react-icons/fa'

function App() {
  const [vidData, setVidData] = useState(data)
  const [newVidTitle, setNewVidTitle] = useState("")
  const [newVidUrl, setNewVidUrl] = useState("")
  const [searchString, setSearchString] = useState("")

  const addVid = (e) => {
    e.preventDefault()

    let newVid = {}
    newVid.id = Math.floor(Math.random() * 1000000)
    newVid.url = newVidUrl
    newVid.title = newVidTitle
    newVid.rating = 0
    
    setVidData([...vidData, {...newVid}])
  }

  const changeRating = (e) => {
    let input = e.currentTarget.id
    let videoId = e.currentTarget.parentElement.parentElement.id

    let newVidData = vidData

    if (input === "up") {
      newVidData.map( item => {
        if (videoId === item.id.toString()) item.rating++
        return item
      })
    } else {
      newVidData.map( item => {
        if (videoId === item.id.toString() && item.rating > 0) item.rating--
        else if (videoId === item.id.toString()) item.rating = 0
        return item
      })
    }

    setVidData([...newVidData])
    setNewVidTitle("")
    setNewVidUrl("")
  }

  return (
    <>
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="app">
        <div className="input-section">
          <div className="add-video-div">
            <h2>Add Video</h2>
            <form onSubmit={(e) => addVid(e)} id="form">
              <label for="title">Title</label>
              <input type="text" name="title" id="title" value={newVidTitle} onChange={(e) => setNewVidTitle(e.currentTarget.value)} />
              <label for="url">URL</label>
              <input type="text" name="url" id="url" value={newVidUrl} onChange={(e) => setNewVidUrl(e.currentTarget.value)} />
            </form>
            <button className="cancel" onClick={() => {
              setNewVidUrl("")
              setNewVidTitle("")
            }}>Cancel</button>
            <button className="add-vid" form="form" type="submit">Add</button>
          </div>
          <div className="search-vid-div">
            <h2>Search Video</h2>
            <label for="search">Search</label>
            <input type="text" name="search" id="search" onChange={(e) => setSearchString(e.currentTarget.value.toLowerCase())} />
          </div>
        </div>

        <div className="vid-display-div">
            {
              vidData
                .filter(vid => vid.title.toLowerCase().includes(searchString))
                .map(vid => {
                const { id, title, url, rating } = vid
                let vidUrlID = url.replace("https://www.youtube.com/watch?v=","")

                return (
                  <div className="video-container-div" key={id} id={id} >
                    <div className="iframe-container">
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${vidUrlID}`} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="title-container">
                      <h3>{title}</h3>
                    </div>
                    <div className="ratings-container">
                      <FaThumbsUp className="thumb-icon" id="up" onClick={(e) => changeRating(e)} />
                      <h3>{rating}</h3>
                      <FaThumbsDown className="thumb-icon" id="down" onClick={(e) => changeRating(e)} />
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    </>
  );
}

export default App;
