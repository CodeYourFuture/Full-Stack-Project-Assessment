import { useState } from "react";


function Add({ videoData, setVideoData })
{
    const [newTitle, setNewTitle] = useState("");
    const [newURL, setNewURL] = useState("");


    const addFunction = (videoData) => 
    {
        const newItem =
        {
            id: videoData.length,
            title: newTitle,
            url: newURL,
            rating: 0,
            added: new Date()
        };

        if (newItem.title && newItem.url)
        {
            fetch('http://192.168.0.15:5000/videos',
                {
                    method: 'POST',
                    body: JSON.stringify(newItem),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((data) => setVideoData(data))
                .catch((err) => console.log(err.message));
        }
    }

    const handleTitle = (event) => 
    {
        setNewTitle(event.target.value);
    }

    const handleURL = (event) => 
    {
        let url = event.target.value;

        if (!url)
        {
            setNewURL("");
        }

        else
        {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
            const YOUTUBE_ID_LENGTH_CHARS = 11;
            const match = url.match(regExp);
            if (match && match[2].length === YOUTUBE_ID_LENGTH_CHARS)
            {
                setNewURL(event.target.value);
            }

            else
            {
                setNewURL("");
            }
        }
    }






    return (
        <form className='AddVideo'>
            <h1>Add Video</h1>
            <div className="AddFields">
                <label>
                    Title:
                    <input id='Title' onChange={handleTitle} key="Title"></input>
                </label>
            </div>
            <div className="AddFields">
                <label>URL:
                    <input id='URL' onChange={handleURL} />
                </label>
            </div>
            <button id="addButton" onClick={() => addFunction(videoData)}>Add
            </button>
        </form>
    );
}


export default Add;