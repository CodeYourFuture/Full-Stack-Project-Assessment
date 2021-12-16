import { useState } from 'react';

export default function AddNewVideo( {fetchData}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
 

  function handleTitle(event) {
    setTitle(event.target.value);
  }
  function handleUrl(event) {
    setUrl(event.target.value);
  }
  function handleSubmitButton(event) {
    event.preventDefault()
    console.log(title, url)
    fetch(`http://localhost:5000/`, {
      method: "POST",
      body: JSON.stringify({
        title,      
        url
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=> {
        if(res.status === 200){
            fetchData()
        }
    });
  }
  
  return (
    <form onSubmit={handleSubmitButton}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        <input
          type="text"
          name="url"
          placeholder="Url"
          value={url}
          onChange={handleUrl}
        />
      </div>
      <button type="submit" >Submit</button>
    </form>
  );
}
