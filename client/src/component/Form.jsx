import React from 'react';

const Form = ({form}) => {
    return (
        <div>
            <form style={{display: form ? "flex" : "none"}}>
                <label>Title</label>
                <input></input><br/>
                <lable>URL</lable>
                <input></input><br/>
                <button>ADD</button>
                <button>Cancel</button>
            </form>
        </div>
    );
}

export default Form;
