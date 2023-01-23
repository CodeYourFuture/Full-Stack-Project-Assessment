import React from 'react'

function DeleteButton({removeVideo, id}) {
  return (
  
    <button title='deleteVideo' onClick={() => removeVideo(id)} class="p-2 mb-1 bg-danger text-white delete-button">Delete</button>
  
  );
}

export default DeleteButton