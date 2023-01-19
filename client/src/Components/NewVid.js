import React from 'react';

const NewVid = () => {
    return (
        <div>
            <a href="#">Add video</a>
          <form>
            <label>Title</label>
            <input type="text"></input>
            <br />
            <label>URL</label>
            <input type="text"></input>
            <br />
            <button>Cancel</button>
            <button>Add</button>
          </form>
        </div>
    )
}

export default NewVid;