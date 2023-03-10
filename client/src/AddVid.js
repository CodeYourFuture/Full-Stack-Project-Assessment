import React from "react";

const AddVid = ({data}) => {
    const handleAdd = ((item)=> {
        data.push(item);
    });
    return (
        <div>
            <h3 onClick={handleAdd}>Add Video</h3>
            <form>
                <div>
                    <label htmlFor="title">Please enter your Title here</label>
                    <input type="text" name="title"/>
                </div>
                <div>
                    <label htmlFor="url">Please enter the embedded URL here</label>
                    <input type="url"  name="title" />
                </div>
                <button>Cancel</button>
                <button>Add</button>
            </form>
        </div>
    );
};

export default AddVid