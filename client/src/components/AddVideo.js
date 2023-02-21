import {React, useState}from 'react'


const AddVideo = () => {
    const [Clicked, setClicked] = useState(false)
const AddClicked = () => {
    const currentClicked = !Clicked;
    setClicked = currentClicked;
}

  return (
    <div>
    <a href = '#' OnClick={AddClicked}><h3 class='add_video'>Add Video</h3></a>


    </div>
  )
}

export default AddVideo