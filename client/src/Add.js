import { useState } from "react";


function Add({ data, setVideoData, setSorted })
{
    const [newTitle, setNewTitle] = useState("");
    const [newURL, setNewURL] = useState("");

    let newItem = {};


    const addFunction = (data) => 
    {
        newItem.id = data.length;
        newItem.title = newTitle;
        newItem.url = newURL;
        newItem.rating = 0;
        newItem.added = new Date();

        if (newItem.title !== "" && newItem.url !== "")
        {
            setVideoData(previous => [...previous, newItem]);
            setSorted(false);
        }
    }

    const handleTitle = (event) => 
    {
        setNewTitle(event.target.value);
    }

    const handleURL = (event) => 
    {
        let url = (event.target.value).toString();

        if (url !== "")
        {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
            let match = url.match(regExp);
            if (match && match[2].length === 11)
            {
                setNewURL(event.target.value);
            }

            else
            {
                setNewURL("");
            }
        }

        else
        {
            setNewURL("");
        }
    }






    return (
        <div className='AddVideo'>
            <h1>Add Video</h1>
            <div className="AddFields">
                <label>
                    Title:
                    <input id='Title' onChange={handleTitle} key="Title"></input>
                </label>
            </div>
            <div className="AddFields">
                <label>URL:
                    <input id='URL' onChange={handleURL}></input>
                </label>
            </div>
            <button onClick={() => addFunction(data)}>Add
            </button>
        </div>
    );
}


export default Add;