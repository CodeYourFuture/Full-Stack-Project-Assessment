import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Videos from "././data/exampleresponse.json";
import FetchVideos from "./FetchVideos.js";
import HandleAddVideoDisplay from "./HandleAddVideoDisplay.js";
import { UserContext } from "./UserContext.js";
import { youtube_regex } from "./youtube_regex.js";

const titleSizeLimit = 80;
const titleHalfLimit = 40;
let uniqueCounter = 1000000;

let firstTime = true;
let videosList,
  sortedIndices,
  tempObject,
  videoInfo = [];

const escapedNewLineToLineBreakTag = (string) => {
  const result = string.split("|").map((item, index) => {
    return index === 0 ? item : [<br key={index} />, item];
  });
  // ensure two lines for the video title
  if (result.length !== 2) result.push([<br key={1} />, "\u00A0"]); // "\u00A0" UNICODE EQUIVALENT TO &nbsp;
  return result;
};

const handleVideoInfo = (element, youtube_id = "") => {
  let theId = "" + element.id; // change to a string
  const theObject = {};
  let doTruncate = false;
  theObject.id = theId;
  theObject.errorOccurred = false;
  theObject.youtube_id = youtube_id;

  let splitArray = element.title.split("|");
  if (splitArray.length > 2) {
    // Only two lines of title text allowed
    // otherwise truncate with ...
    doTruncate = true;
  }

  if (!doTruncate && element.title.length >= titleSizeLimit) {
    // Up to 80 characters allowed
    // otherwise truncate with ...
    doTruncate = true;
  } else {
    theObject.renderTitle = escapedNewLineToLineBreakTag(element.title);
  }

  if (doTruncate) {
    // find a suitable space
    let pos = element.title.indexOf(" ", titleHalfLimit);
    if (pos < 0) {
      // Create a new line at this position regardless
      pos = titleHalfLimit;
    }

    let aString = element.title.substring(0, titleSizeLimit);
    theObject.renderTitle = escapedNewLineToLineBreakTag(
      aString.substring(0, pos) + "|" + aString.substring(pos) + " ..."
    );
  }

  return theObject;
};

function App() {
  function produce_videoInfo(videosList) {
    videoInfo = [];
    videosList.forEach((element, index) => {
      // Preprocess each video

      let theObject = handleVideoInfo(element);

      /*  
          src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
          So I need to extract for example
          "dQw4w9WgXcQ"
          from
              https://www.youtube.com/watch?v=dQw4w9WgXcQ"
       */

      // Check whether it is a valid URL?
      // Determine the ID
      let ID = youtube_regex(element.url);
      if (ID !== "") {
        theObject.youtube_id = ID;
      } else {
        // Erroneous ID/URL!
        theObject.errorOccurred = true;
      }

      videoInfo.push(theObject);
    });

    return videoInfo;
  }

  if (firstTime) {
    firstTime = false;

  /* 
    Initialise videosList with
    10 videos
    e.g. [ {id: 523523, title: 'Never Gonna Give You Up', 
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', rating: 23} ...]
  */

    videosList = Videos;
    sortedIndices = Array.from(Array(videosList.length).keys()); // 0 to N-1 {0,1,2,...N-1} - N being the length of the videos inputted
    // Descending Ratings Order
    sortedIndices.sort((a, z) => videosList[z].rating - videosList[a].rating);
    videoInfo = produce_videoInfo(videosList);
    tempObject = {
      videosList: videosList,
      titlesIndices: sortedIndices,
      displayedIndices: sortedIndices,
      textEntered: "",
    };
  }

  const [stateObject, setStateObject] = useState({ ...tempObject }); // shallow copy
  const [anUpdate, setAnUpdate] = useState(null);
  const [addAVideoFlag, setADDAVideoFlag] = useState(false);

  useEffect(() => {
    let anyUpdates = anUpdate; // EG {"title":"A Title","url":"https://youtu.be/ZacOS8NBK6U"}

    // REMOVE VIDEO
    if (anyUpdates && anyUpdates.hasOwnProperty("removed")) {
      // Remove video and update states/display accordingly
      let videoIndex = anyUpdates.removed;

      let newVideosList = stateObject.videosList
        .slice(0, videoIndex)
        .concat(
          stateObject.videosList.slice(
            videoIndex + 1,
            stateObject.videosList.length
          )
        );

      let sortedIndices = Array.from(Array(newVideosList.length).keys()); // 0 to N-1 {0,1,2,...N-1} - N being the length of the videos inputted
      sortedIndices.sort(
        (a, z) => newVideosList[z].rating - newVideosList[a].rating
      );

      // Update the Video Info List
      videoInfo = videoInfo
        .slice(0, videoIndex)
        .concat(videoInfo.slice(videoIndex + 1, videoInfo.length));

      let filteredIndices = applyFilter(sortedIndices, newVideosList);

      // Update the State with the modified lists
      setStateObject({
        ...stateObject,
        videosList: newVideosList,
        titlesIndices: sortedIndices,
        displayedIndices: filteredIndices,
      });
      return;
    }

    // INCREMENT VOTE
    if (anyUpdates && anyUpdates.hasOwnProperty("increment")) {
      // Increment the ratings and update states/display accordingly
      let videoIndex = anyUpdates.increment;
      let newList = [...stateObject.videosList];
      ++newList[videoIndex].rating;
      setStateObject({
        ...stateObject,
        videosList: newList,

        anyUpdates: null,
      });
      return;
    }

    // DECREMENT VOTE
    if (anyUpdates && anyUpdates.hasOwnProperty("decrement")) {
      // Decrement the ratings and update states/display accordingly
      let videoIndex = anyUpdates.decrement;
      let newList = [...stateObject.videosList];
      --newList[videoIndex].rating;
      setStateObject({
        ...stateObject,
        videosList: newList,
      });
      return;
    }

    // ADD VIDEO
    if (anyUpdates && anyUpdates.hasOwnProperty("url")) {
      // EG {"title":"A Title","url":"https://youtu.be/ZacOS8NBK6U"}
      // Add video and update states/display accordingly

      const { title, url, youtube_id } = anyUpdates;

      let newVideosList = stateObject.videosList.concat({
        id: uniqueCounter++,
        title: title,
        url: url,
        rating: 0,
        timestamp: Date.now(),
      });

      let sortedIndices = Array.from(Array(newVideosList.length).keys()); // 0 to N-1 {0,1,2,...N-1} - N being the length of the videos inputted
      // Descending Ratings Order
      sortedIndices.sort(
        (a, z) => newVideosList[z].rating - newVideosList[a].rating
      );

      // Update the Video Info List with the new entry
      let theObject = handleVideoInfo(
        newVideosList[newVideosList.length - 1],
        youtube_id
      );
      videoInfo = videoInfo.concat(theObject);

      let filteredIndices = applyFilter(sortedIndices, newVideosList);

      // Update the State with the new lists
      setStateObject({
        ...stateObject,
        videosList: newVideosList,
        titlesIndices: sortedIndices,
        displayedIndices: filteredIndices,
      });
      return;
    }

    // DISPLAY ERROR MESSAGE
    if (anyUpdates && anyUpdates.hasOwnProperty("message")) {
      // Display the message as a Snackbar

      let theMessage = document.getElementById("snackbar");

      theMessage.innerHTML = anyUpdates.message;
      console.log(anyUpdates.message);

      // Add the "show" class to DIV
      theMessage.className = "show";
      theMessage.style.visibility = "visible"; // I don't know why I have to do this!!!!
      // Could someone solve and explain this issue to me. Thank You

      // After 5 seconds, remove the show class from DIV
      setTimeout(function () {
        theMessage.className = theMessage.className.replace("show", "");
        theMessage.style.visibility = "hidden"; // I don't know why I have to do this!!!! See above.
      }, 5000);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anUpdate]);

  function handleChange(event) {
    let enteredString = event.target.value;

    let filteredIndices = applyFilter(
      stateObject.titlesIndices,
      stateObject.videosList,
      enteredString
    );

    // update State with the text entered and the filtered result
    setStateObject({
      ...stateObject,
      textEntered: enteredString,
      displayedIndices: filteredIndices,
    });
  }

  function handleAddVideoButtonClick(event) {
    if (addAVideoFlag) return;

    setADDAVideoFlag(true);
  }

  function clearSearch() {
    if (stateObject.textEntered !== "") {
      // update State - display all videos
      setStateObject({
        ...stateObject,
        textEntered: "" /* Cleared the Search String */,
        displayedIndices: stateObject.titlesIndices,
      });
    }
  }

  function applyFilter(
    titlesIndices,
    videosList = stateObject.videosList,
    enteredString = stateObject.textEntered
  ) {
    return titlesIndices.filter((element) =>
      videosList[element].title
        .toLowerCase()
        .includes(enteredString.toLowerCase())
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <UserContext.Provider
        value={{
          setAnUpdate: setAnUpdate,
          addingVideoFlag: addAVideoFlag,
          addFunction: setADDAVideoFlag,
          theData: stateObject,
        }}
      >
        <div className="top-container">
          <div class="top-item">
            <button
              className="asTextButton"
              id="addvideobutton"
              onClick={handleAddVideoButtonClick}
            >
              Add Video
            </button>
            <HandleAddVideoDisplay
              addingVideoFlag={addAVideoFlag}
              setAddFunction={setADDAVideoFlag}
              setUpdateFunction={setAnUpdate}
            />
          </div>

          <div id="snackbar-header" className="top-item">
            <label for="Search Videos">
              Search&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className="searchbar"
                type="text"
                autoComplete="off"
                id="video-query"
                name="q"
                value={stateObject.textEntered}
                onChange={handleChange}
              />
            </label>
            <div class="close-x" onClick={clearSearch}>
              &#10006;
            </div>
          </div>
          <div className="top-item">
            <div></div>
            <div id="snackbar"></div>
          </div>
        </div>

        <div></div>
        <div></div>
        <div></div>
        <hr className="showhr"></hr>
        <FetchVideos
          theVideos={[...stateObject.videosList]}
          theIndices={[...stateObject.displayedIndices]}
          videoInfo={videoInfo}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
