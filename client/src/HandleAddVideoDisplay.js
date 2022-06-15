import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import ValidateURL from "./ValidateURL.js";

const HandleAddVideoDisplay = () => {
    
  const ValidateTheVideo = (event) => {

    let title = document.forms["addvideoform"]["entered-title"].value;
    if (title === "") {
      return false;
    }

    let url = document.forms["addvideoform"]["entered-URL"].value;
    if (url === "") {
      return false;
    }

    event.preventDefault(); // After ensuring both fields are nonnull, Prevent Form Submission

    let result = ValidateURL(title, url, setUpdateFunction);
    // If there is a return from this function then it is a failed URL

    // The timestamp Date.now() is used to ensure that 'useEffect' in App.js triggers when there is a new message
    setUpdateFunction({ messageID: Date.now(), message: result[1] });
    return;

    /*
    if (!result[0]) {
      // The timestamp Date.now() is used to ensure that 'useEffect' in App.js triggers when there is a new message
      setUpdateFunction({ messageID: Date.now(), message: result[1] });
      return
    }

   /* 
    if (result) {
      document.getElementById("enteredTitle").value = "";
      document.getElementById("enteredURL").value = "";
      setUpdateFunction({
        title: title,
        url: url,
        youtube_id: youtube_id,
      });
    }
    */
  };

  /* USECONTEXT to pass down the 'setter' functions and other relevant parameters */
    const {
      setAnUpdate: setUpdateFunction,
      addingVideoFlag,
      addFunction: setAddFunction,
    } = useContext(UserContext);

  if (!addingVideoFlag) {
    return null;
  }

  return (
    <form name="addvideoform">
      <div className="addVideoDisplay">
        <div className="addVideoDisplay2">
          <p>Title</p>
          <input
            className="addVideoBars"
            type="text"
            autoComplete="off"
            id="enteredTitle"
            name="entered-title"
            required
            maxLength="50"
          />
        </div>
        <div className="addVideoDisplay2">
          <p>URL</p>

          <input
            className="addVideoBars"
            type="text"
            autoComplete="off"
            id="enteredURL"
            name="entered-URL"
            required
            maxLength="50"
          />
        </div>
        <div className="addButtonsDisplay">
          <div>
            <button className="button-32" onClick={() => setAddFunction(false)}>
              Cancel
            </button>
          </div>
          <div>
            <button
              className="button-32 addVideoButton"
              onClick={ValidateTheVideo}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HandleAddVideoDisplay;
