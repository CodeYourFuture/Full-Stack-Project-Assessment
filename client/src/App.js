import "./App.css";
import Video from "./Video";
import data from "../src/exampleresponse.json"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

function App() {
  const [isOpen , setIsOpen]= useState(false)

  const clickHandler =() => {
    setIsOpen (true)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Container>
      <Row>
        <Col><Button variant="link" onClick={clickHandler}> Add Video </Button>
        { isOpen && (
          <>

        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <br></br>
      <Button variant="Cancle">Warning</Button>{' '}
      <Button variant="Add">Danger</Button>{' '}

        </>)}      


</Col>
        <Col><InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </Col>
      </Row>
      
      </Container>
      <div className="video-container">

      {data.map(item =>(
              <Video info = {item}>
              </Video>
            ))}
        </div>
           
     

      

     
    </div>
  );
}

export default App;