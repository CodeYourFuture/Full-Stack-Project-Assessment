    import React, {useState, useEffect} from "react";

    const AddVid = ({dataEmb}) => {
        const[title, setTitle] = useState('');
        const[url, setUrl] = useState('');
        const [setVideos] = useState([dataEmb]);

    // fetching data from Render
        useEffect(() => {
            fetch("/videos/insert")
            .then((response) => response.json())
            .then((data) => setVideos(data));
        }, [setVideos]);


    // Handling the new title
        const handleTitle = (event) => setTitle(event.target.value);
    // Handling the new url
        const handleUrl = (event) => setUrl(event.target.value);
    // Handling the adding of the video
        const handleAdd = (event) => {
            event.preventDefault();
            fetch("/videos/add",{ title, url }, {
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
                setVideos(videos => [...videos, newVideo]);
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
                        <input id="url" type="text"  value={url} onChange={handleUrl} />
                    </div>
                    {/* <button>Cancel</button> */}
                    <button type="submit">Add</button>
                    {/* {videos.map((video, index) => (
                        <span key={index}>
                            <h3>{video.title}</h3>
                            <iframe 
                                width = "560"
                                height="315"
                                src={video.url}
                                title={video.title}
                                frameBorder="0"
                                alt={`video ${video.title}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                            />
                        </span>
                    ))} */}
                </form>
            </div>
        );
    };

    export default AddVid