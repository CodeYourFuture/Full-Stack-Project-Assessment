import React, { useState } from "react";
import { Button } from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import nextId from "react-id-generator";
import "../App.css";

const Adding = (props) => {
  const defaultRating = 0;
  const [showResults, setShowResults] = useState(false);
  const [inputURL, setInputURL] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const timestamp = Date.now();
  const timestampFormatted = new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
  console.log(timestampFormatted);

  const onClick = () => {
    // I had help on the next line to ensure the button displays or hides the fields
    let newValue = !showResults;
    setShowResults(newValue);
  };

  function handleTitleInput(event) {
    setInputTitle(event.target.value);
  }

  function handleURLInput(event) {
    setInputURL(event.target.value);
  }

  function addVideoToListOnInput() {
    if (validateYouTubeUrl(inputURL)) {
      let newVideo = {
        id: nextId(),
        title: inputTitle,
        url: inputURL,
        rating: defaultRating,
        timestamp: timestampFormatted,
      };
      props.addVideo(newVideo);
      // https://www.youtube.com/watch?v=vMLk_T0PPbk
      console.log("URL IS VALID: " + inputURL);
    } else {
      console.log("INVALID URL");
    }
  }

  function clearInputFields(e) {
    e.preventDefault();
    // clearing the values
    setInputTitle("");
    setInputURL("");
  }

  return (
    <>
      <Button color="warning add-video" block onClick={onClick}>
        Add video
      </Button>
      <div>
        {showResults ? (
          <div>
            <InputGroup className="search">
              <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
              <Input onChange={handleTitleInput} value={inputTitle} />
            </InputGroup>
            <InputGroup className="search">
              <InputGroupAddon addonType="prepend">URL</InputGroupAddon>
              <Input onChange={handleURLInput} value={inputURL} />
            </InputGroup>
            <div className="addClearButtonsContainer">
              <Button
                color="danger"
                disabled={!inputURL}
                onClick={clearInputFields}
                className="clearButton"
              >
                Clear
              </Button>
              <Button
                color="success"
                onClick={addVideoToListOnInput}
                disabled={!inputURL}
                className="addButton"
              >
                Add
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Adding;

function validateYouTubeUrl(url) {
  if (url !== undefined || url !== "") {
    const reg =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
    return url.match(reg) != null;
  }
}
