import React, { useState } from 'react'
import axios from 'axios';
const path = 'http://localhost:5000/';

const AddVideo = ({ allData, handleSet, loadData }) => {
  const [toggle, setToggle] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAdd = () => {
    setToggle(!toggle)
  }

  const resetAddForm = () => {
    setToggle(!toggle)
    setTitle('')
    setUrl('')
  }

  const matchYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if (url.match(p)) return true
    return false
  }
  const validationCheck = () => {
    setErrorMessage('')
    let result = true
    let match = matchYoutubeUrl(url)
    if (title.length === 0 && (url === undefined || url === '' || !match)) {
      setErrorMessage('Please make sure you have entered both title and URL')
      result = false
    } else if (title.length === 0) {
      setErrorMessage('Please enter a valid title')
      result = false
    } else if (url === undefined || url === '' || !match) {
      setErrorMessage('Please enter a valid youtube URL')
      result = false
    }
    return result
  }

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault()
    if (validationCheck()) {
      const id = Math.max(...allData.map((v) => v.id)) + 1
      const newVideo = {
        id: id,
        title: title,
        url: url,
        rating: 0,
      }
      axios.post(path, newVideo).then(()=> loadData())
      resetAddForm()
    }
  }
  return (
    <>
      <button className="btn btn-success mr-4" onClick={handleAdd}>
        Add Video
      </button>
      <div className="add-video">
        <div className={toggle ? 'display-block' : 'display-none'}>
          <form onSubmit={handleSubmitEvent}>
            <div className="row align-items-end">
              <div className="col">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="form-control"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary d-block">
                Save
              </button>
            </div>
          </form>
          <p className="error">{errorMessage}</p>
        </div>
      </div>
    </>
  )
}

export default AddVideo
