    import React, {useState} from "react";

    const AddVid = (item) => {
        const[title, setTitle] = useState('');
        const[url, setUrl] = useState('');

    // Handling the new title
        const handleTitle = (event) => setTitle(event.target.value);
    // Handling the new url
        const handleUrl = (event) => setUrl(event.target.value);
    // Handling the adding of the video
        const handleAdd = (event) => {
            event.preventDefault();
            fetch("/videos/add", {
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
                return response.json()
            })
            .then(data => {
                // Creating a new object with the title and embedded URL
                const newVideo = { title: data.title, url: data.url };
                // Updating the embUrls state by appending the new object
                item(videos => [...videos, newVideo]);
                // Clearing the input fields
                setTitle("");
                setUrl("");            
            })
            .catch(error => console.error('Error:', error));
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
                        <input id="url" type="text"  value={url} onChange={handleUrl} />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    };

    export default AddVid