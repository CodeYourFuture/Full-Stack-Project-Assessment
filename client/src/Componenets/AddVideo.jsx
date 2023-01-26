import React, { useState } from 'react'

import uuid from 'react-uuid'

const AddVideo = ({ exampleResponse }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const addToResponse = (e) => {
    e.preventDefault()
    console.log('hello again react')
    const newVideo = {
      id: uuid(),
      title: title,
      url: url
    }
    console.log(newVideo)
    exampleResponse.push(newVideo)
    console.log(exampleResponse)
  }

  return (
    <div>
      <form action="">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="input-title"
          name="title"
          onChange={handleTitle}
          required
        />
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          id="input-url"
          name="url"
          onChange={handleUrl}
          required
        />
        <button onClick={addToResponse}>Submit</button>
        {/* add to  */}
      </form>
    </div>
  )
}

export default AddVideo
