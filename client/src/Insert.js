import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Insert({ setURL, order }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // regular expressions for matching title and YouTube URL
    const titleExp = /[A-Za-z-_()0-9?]/g;
    const urlExp =
      /^(https?:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/g;

    //matching title and URL
    if (!titleExp.test(title.trim()) || !urlExp.test(url)) {
      setAlert("Invalid Youtube URL/Title.");
      setAlertTimeout(5);
      return;
    }

    //Create and send a POST request to server (send data to the server)
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          videoTitle: title,
          videoURL: url,
        }),
      });
      await res.json();

      if (res.ok) {
        setAlert(`Video saved successfully`);
        setURL(
          `order/?by=${order}&${Math.floor(
            Math.random() * (1000 - 10 + 1) + 10
          )}`
        );
        setAlertTimeout(5);
      } else {
        setAlert(
          "<strong>Warning:</strong> Data didn't save please contact administrator"
        );
        setAlertTimeout(5);
      }
      clearTextFields();
    } catch (e) {
      setAlert("Unexceptional error occurred into the system.");
      setAlertTimeout(5);
      console.log(e);
    }
  };

  const setAlertTimeout = (sec) => {
    setTimeout(() => {
      setAlert("");
    }, sec * 1000);
  };

  const clearTextFields = () => {
    setTitle("");
    setUrl("");
  };

  const handleForm = () => {
    clearTextFields();
    setDisplayForm(!displayForm);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="bg-primary m-3"
        onClick={handleForm}
      >
        Add New Video
      </Button>
      <div className={displayForm ? "" : "d-none"}>
        <div
          className={
            alert ? "alert alert-info alert-dismissible fade show" : ""
          }
          role="alert"
        >
          <p className="message">{alert}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            required
            label="Video Title"
            variant="outlined"
            type="text"
            className="m-2 w-30 form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            required
            type="text"
            label="YouTube URL"
            className="m-2 w-30 form-control"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <Button variant="contained" className="m-2 bg-info" type="submit">
            Add
          </Button>
          <Button
            variant="contained"
            type="reset"
            className="bg-warning m-2"
            onClick={handleForm}
          >
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}
