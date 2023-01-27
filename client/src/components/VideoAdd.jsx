import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade, Form } from "react-bootstrap";

function VideoAdd() {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }
    if (event.target.name === "url") {
      setUrl(event.target.value);
    }
    if (event.target.name === "rating") {
      setRating(event.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const video = {
      title,
      url,
      rating,
    };
    fetch("http://localhost:3011/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    alert("Video added successfully.");
    window.location.href = "http://localhost:3000";
  };
  return (
    <div>
      <Button
        className="add"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant={"outline-primary"}
      >
        Add Video
      </Button>
      <div style={{ minHeight: "150px" }}>
        <Fade in={open}>
          <div id="example-fade-text">
            <Card
              body
              style={{
                width: "400px",
                backgroundColor: "#665A48",
                border: "none",
              }}
            >
              <Form style={{ height: "200px", width: "200px" }}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title..."
                    name={"title"}
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Url</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter url..."
                    name={"url"}
                    value={url}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="outline-success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Form>
            </Card>
          </div>
        </Fade>
      </div>
    </div>
  );
}
export default VideoAdd;