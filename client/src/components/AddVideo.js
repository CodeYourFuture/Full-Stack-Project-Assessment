import React, { useState } from 'react';

function AddVideo (props) {

  return(
    <div>
      <form>
      <label for="Video title">Video Title</label>
            <input id="Video title" type="text"/>
            <label for="Video link">Video link</label>
            <input id="Video link" type="text"/>
            <input id="Submit" type="submit"/>
      </form>
    </div>
  )
}

export default AddVideo;
