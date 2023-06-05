import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Video from "./Video";

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://full-stack-assessment.onrender.com/videos?ordering=${
            isAscending ? "asc" : "desc"
          }`
        );
        setIsLoading(true);
        setItems(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [isAscending]);

  const orderHandler = (e) => {
    setIsAscending(!isAscending);
  };

  const searchHandler = async () => {
    const res = await axios.get(
      `https://full-stack-assessment.onrender.com/search/?title=${search}`
    );
    setItems(res.data);
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const cancelHandler = () => {
    setIsOpen(false);
  };

  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const validateUrl = (value) => {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!value || !urlRegex.test(value)) {
      alert("Please enter a valid URL");
    }
    return null; // Return null for no validation errors
  };

  const addClickHandler = async () => {
    if (!title) {
      alert("Please enter a title");
      return;
    }
    validateUrl(url);
    try {
      const response = await axios.post(
        "https://full-stack-assessment.onrender.com/video",
        {
          title: title.toLowerCase(),
          url: url.split("watch?v=")[1],
        }
      );
      setTitle("");
      setUrl("");
      alert("Video has been sent");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header bg-primary py-4 custom-header">
        <h1 className="text-center mb-0">Video Recommendation</h1>
      </header>

      <Container className="p-4">
        <Row>
          <Col md={4} className="mb-4">
            <Button variant="link" onClick={openHandler}>
              Add Video
            </Button>
            {isOpen && (
              <>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Title</InputGroup.Text>
                  <Form.Control
                    onChange={titleHandler}
                    value={title}
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>URL</InputGroup.Text>
                  <Form.Control
                    onChange={urlHandler}
                    value={url}
                    placeholder="Youtube URL"
                    aria-label="URL"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <br />
                <Button variant="outline-success" onClick={addClickHandler}>
                  Add
                </Button>
                <Button variant="outline-warning" onClick={cancelHandler}>
                  Cancel
                </Button>
              </>
            )}
          </Col>
          <Col>
            <Button onClick={orderHandler} id="asc-btn">
              {isAscending ? "Descending" : "Ascending"}
            </Button>
          </Col>
          <Col md={4}>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button onClick={searchHandler} className="mr-5">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row xs={1} sm={2} md={3}>
          {!isLoading && <h1>Loading...</h1>}
          {items &&
            items.map((item) => (
              <Col key={item.id}>
                <Video info={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
