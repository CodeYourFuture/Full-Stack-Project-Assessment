import React, { useState } from 'react';
import './Add.css';

const Add = (props) => {

    const [newVid, setNewVid] = useState({
        title: '',
        url: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setNewVid(prevVid => {
            return {
                ...prevVid,
                [name]: value
            }
        })

    }

    function submitVid(event) {
        props.onAdd(newVid);
        event.preventDefault()
    }


    return (
        <div className="container">

            <h2>Please Add Your Videos</h2>
            <input
                onChange={handleChange}
                value={newVid.title}
                name='title'
                placeholder='Title'>
            </input>
            <input
                onChange={handleChange}
                value={newVid.url}
                type="url"
                name="url"
                id="url"
                placeholder="https://example.com">

            </input>
            <button onClick={submitVid} className="add-btn">ADD</button>


        </div>
    )
}

export default Add;
