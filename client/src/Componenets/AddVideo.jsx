import React from 'react'

const AddVideo = () => {
  return (
    <div>
      <form action="">
        <label htmlFor="title">Title: </label>
        <input type="text" id="input-title" name="title" />
        <label htmlFor="url">Url:</label>
        <input type="text" id="input-url" name="url" />
        <button>Submit</button>
        {/* add to api */}
      </form>
    </div>
  )
}

export default AddVideo
