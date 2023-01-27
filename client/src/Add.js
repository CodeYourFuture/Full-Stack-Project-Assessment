import React , { useState } from 'react';
import Videos from "./exampleresponse.json";
import uuid from 'react-uuid';



const Add = () => {
    
    const handleSubmit = (data) => {
     let newv = {
     "id": uuid(),
     "title": data.title,
     "url":data.url,
    }
     Videos.push(newv.json)
    }
  return (
    <div>
        <h2>Add to your library</h2>
        <form>
            <label>
            Title
            <input type="text" name="title" />
            </label>
            <label>
            URL
            <input type="text" name="url" />
            </label>
            <input onClick={handleSubmit} type="submit" value="Submit" />
        </form>

    </div>
  )
}

export default Add;