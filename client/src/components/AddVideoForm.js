import React from 'react';
import AddVideoButtons from './AddVideoButtons';

const AddVideoForm = ({ clicked, setClicked, videos, setVideos }) => {
    return (
      <form>
        <div>
          <label>
            Title
            <input className="input ml-3" name="title" type="text" required="" />
          </label>
        </div>
        <div>
          <label>
            URL
            <input className="input ml-3" name="vurl" type="text" required="" />
          </label>
        </div>
        <AddVideoButtons
          clicked={clicked}
          setClicked={setClicked}
          videos={videos}
          setVideos={setVideos}
        />
      </form>
    );
}

export default AddVideoForm
