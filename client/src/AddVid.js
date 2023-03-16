import React, {useState} from "react";

const AddVid = ({embUrls}) => {
    const[title, setTitle] = useState('');
    const[url, setUrl] = useState('');
    const[setEmbUrls] = useState(embUrls);


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
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            response.json()
        })
        .then(data => {
            // Creating a new object with the title and embedded URL
            const newVideo = { title: data.title, url: data.url };
            // Updating the embUrls state by appending the new object
            setEmbUrls(prevState => [...prevState, newVideo]);
            // Clearing the input fields
            setTitle("");
            setUrl("");            
        })
    };

    return (
        <div>
            <h2>Add Video</h2>
            <form onSubmit={handleAdd}>
                <div>
                    <label htmlFor="title">Please enter your Title here</label>
                    <input id="title" type="text" value={title} onChange={handleTitle}/>
                </div>
                <div>
                    <label htmlFor="url">Please enter the embedded URL here</label>
                    <input id="url" type="text"  onChange={handleUrl} />
                </div>
                {/* <button>Cancel</button> */}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddVid