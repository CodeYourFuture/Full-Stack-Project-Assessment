import React, { useState } from "react";

function Form({addVideo}) {
  const [title, setTitle] = useState("");

  const [url, setUrl] = useState("");

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <form onSubmit={(e)=> {
        e.preventDefault()
        const video = {
          title,
          url
        }

        addVideo(video)
      }} id="form-input">
        <h3 onClick={() => setShowForm(true)}>add video</h3>
        {showForm && (
          <>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="title"
              type="text"
              placeholder="TITLE"
            />
            <input
              onChange={(e) => setUrl(e.target.value)}
              className="url"
              type="text"
              placeholder="URL"
            />
            <div className="btn-container">
              <button onClick={() => setShowForm(false)} type="button">
                Cancel
              </button>
              <button>Add</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Form;
