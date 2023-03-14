import React, {useState} from "react";

const AddVid = () => {
    const[title, setTitle] = useState('');
    const[url, setUrl] = useState('');

// Handling the new title
    const handleTitle = (event) => setTitle(event.target.value);

// Handling the new url
    const handleUrl = (event) => setUrl(event.target.value);
    
    const handleAdd = (event) => {
        event.preventDefault();
        fetch('videos/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, url })
        })
        .then(response => response.json())
        .then(data => {
      // Updating state with new data
            setTitle(data.title);
            setUrl(data.url);            
        })
    };

    return (
        <div>
            <h3>Add Video</h3>
            <form onSubmit={handleAdd}>
                <div>
                    <label htmlFor="title">Please enter your Title here</label>
                    <input type="text" value={title} onChange={handleTitle}/>
                </div>
                <div>
                    <label htmlFor="url">Please enter the embedded URL here</label>
                    <input type="text"  onChange={handleUrl} />
                </div>
                {/* <button>Cancel</button> */}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddVid