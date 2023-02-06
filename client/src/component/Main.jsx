import React from 'react';
import Form from './Form';
import { useState } from 'react';



const Main = () => {
    const [form,setForm]=useState(false)
    function formHandeler(){
    setForm(!form)
    }
    return (
        <>
            <button onClick={formHandeler}>Add video</button>
            <Form  form={form}/>
        </>
    );
}

export default Main;
