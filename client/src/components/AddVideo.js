import React from "react";

function AddVideo() {
  return (
    <main>
      <div className="add-video-container">
        <form className="form">
          <div className="inputs">
            <div className="input">
              <label>title</label>
              <input type="text" placeholder="type title" />
            </div>
            <div className="input">
              <label>url</label>
              <input type="text" placeholder="type url" />
            </div>
          </div>

          <div className="buttons">
            <button>cancel</button>
            <button>add</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddVideo;
