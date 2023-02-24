import React,{useState} from 'react'


const AddVideo = (props) => {
  const [title, setTitle]= useState("");
  const [url, setUrl] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    e.preventDefault();

    
  }

  const handleChangeUrl = (e) =>{
    setUrl(e.target.value);
    e.preventDefault();
  }
  function addVideoObj() {
    const videoObj = {title: title, url: url};
    props.addVideo(videoObj);
    setTitle("");
    setUrl("");
  }


  return (
    <div className="add-video-container">
        <div className="add-video-title">
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>

        <div className="add-url">
          <p>URL</p>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={handleChangeUrl}
          />
        </div>

        <div className="add-cancel-buttons-container">
          <div className="add-button">
            <button onClick={addVideoObj}>ADD</button>
          </div>

          <div className="cancel-button">
            <button>CANCEL</button>
          </div>
        </div>
      </div>

    
  )
}

export default AddVideo