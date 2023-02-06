import React from 'react'

function addVideo() {
  return (
    <div>
    <h1>addVideo</h1>
    <form>  
        <label>Video Title</label>
        <input type="text" name="title" />
        <label>Video URL</label>
        <input type="text" name="url" />
        <label>Video Description</label>
        <input type="text" name="description" />
        <label>Video Category</label>
        <input type="text" name="category" />
        <label>Video Rating</label>
        <input type="text" name="rating" />
        <button type="submit">Submit</button>
            
    
    
    
    </form>
    </div>
  )
}

export default addVideo