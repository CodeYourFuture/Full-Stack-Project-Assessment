import React from 'react'


function DeleteButton({video, setvideos, videos})  {
  return (
    <button onClick={() => {
      const filteredVideos = videos.filter((v) => {
        if (video.id !== v.id)
        {return (v)};
      });
      setvideos (filteredVideos);
    } } class="p-2 mb-1 bg-danger text-white delete-button">Delete</button>
  );
}

export default DeleteButton