import { useState } from "react";

const Insert = () => {
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

    //Create and send a POST request to server
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
      const vid = await res.json();

      //

      if (res.ok) {
        setAlert(vid.message);
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
      <button className="btn btn-primary m-3" onClick={handleForm}>
        Add Video
      </button>
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
          <input
            type="text"
            placeholder="Title"
            className="m-2 form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="YouTube URL"
            className="m-2 form-control"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <button className="btn btn-info m-2" type="submit">
            Add
          </button>
          <button
            type="reset"
            className="btn btn-warning m-2"
            onClick={handleForm}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Insert;
