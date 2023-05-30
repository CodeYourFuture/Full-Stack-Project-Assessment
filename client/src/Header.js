import { useState } from "react";

const defaultState = {
  id: 0,
  title: "",
  url: "",
  rating: 0,
  videoID: ""
}

function Header(props) {

  const [formData, setFormData] = useState(defaultState);

  function handleSubmit(event) {
    event.preventDefault();
    props.setVideos([...props.videos, {...formData, 
    id: props.videos.length +1,
    videoID: formData.url.split("v=")[1]}])
    console.log(formData)
    setFormData(defaultState)
  }

  function handleChange (event){
    event.preventDefault();
    const newState = {...formData}
    newState[event.target.name] = event.target.value 
    setFormData(newState)
  }

//  const videoID = link.split("v=")[1];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="Link"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </label>
      <button>ADD</button>
    </form>
  );
}

export default Header;
