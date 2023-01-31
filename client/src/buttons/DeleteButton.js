import React from 'react'


function DeleteButton({video, setvideos, videos})  {
  const handleClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/video/${video.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Status code: ${response.status}`);
      }

      const filteredVideos = videos.filter((v) => {
        return v.id !== video.id;
      });

      setvideos(filteredVideos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleClick} class="delete-button">Delete</button>
  );
}

export default DeleteButton;