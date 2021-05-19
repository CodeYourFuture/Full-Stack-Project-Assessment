import React from 'react'

const AddVideo = () => {
    return (
        <div id='addContainer'>
            <input type="text" placeholder='Enter video title' />
            <input type="text" placeholder='Enter video URL' />
            <button>Add Video</button>
        </div>
    )
}

export default AddVideo
