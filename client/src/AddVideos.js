import React from 'react'

const AddVideos = ({entry, entryUrl}) => {
  const id = entryUrl.slice(0,(entryUrl.lastIndex(0, )));
  return (
    <div>
      <iframe width="560" height="315" src={entryUrl} title={entry} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  )
}

export default AddVideos