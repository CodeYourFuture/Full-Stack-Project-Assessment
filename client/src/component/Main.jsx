import React from 'react';
import data from "../data/exampleresponse.json"
import Form from './Form';
import { useState } from 'react';



const Main = () => {
    const [form,setForm]=useState(false)
    function formHandeler(){
    setForm(!form)
    }
    return (
        <div>
            <button onClick={formHandeler}>Add video</button>
            <Form  form={form}/>
        </div>
    );
}

export default Main;
