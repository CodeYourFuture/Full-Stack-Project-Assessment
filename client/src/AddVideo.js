import React from 'react';

 function AddVideo() {
  return (
    <div>
      <button>Add Your Favourite Soul Video</button>
      <form>
        <div>
          {" "}
          <input type="text" placeholder="Video Title" name="name" />
        </div>
        <div>
          {" "}
          <input type="text" placeholder="YouTube URL" />
        </div>
        <div><button>Add Video to list</button></div>
      </form>
    </div>
  );
}

export default AddVideo;