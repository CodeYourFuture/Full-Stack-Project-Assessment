import React, { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// import Button from "./AddVideo";
import AddVideo from "./AddVideo";
import AddVideoForm from "./AddVideoForm";

 
import Search from "./Search";

function App() {
  const [addVideo, setAddVideo] = useState(false);

  const addVideoHandler = () => {
    setAddVideo((prevShowParagraph) => !prevShowParagraph);
  };

  return (
    <div className="App">
      <header className="p-3 mb-2 bg-primary text-white">
        <h1>Video Recommendation</h1>
      </header>
      <Container className=" mt-3">
        <Row>
          <Col md>
            <AddVideo onClick={addVideoHandler}>Add Video</AddVideo>
            {addVideo && <AddVideoForm />}
          </Col>
          <Col md>
            <Search />
          </Col>
        </Row>
      </Container>
      <body>
        
      </body>
    </div>
  );
}

export default App;
