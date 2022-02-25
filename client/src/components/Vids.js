import React from 'react';
import Vid from './Vid';
//import App from './../App';

const Vids = ({ videos, deleteVideo, updateRating }) => {
  return (
<div className='d-flex flex-wrap'>
    {videos.map((item) => {
    return <Vid className='max-width: 30%' id={item.id} key={item.id} videos={item} deleteVideo={deleteVideo} updateRating={updateRating}/>
})}
  </div>
  )
};

export default Vids;
