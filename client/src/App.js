// import "./App.css";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Video from "./Video";
// import AddVideo from "./AddVideo";
// import data from '../src/exampleresponse.json';
// import React from "react";





// function App() {
   


//   return (
    
//     <div className="App">
//       <header className="App-header">
//         <h1>Video Recommendation</h1>
//       </header>
//       <Container>
//       <Row>
//       <Col>
//       <Button variant="link" id="addvideo"  onClick={() => this.handleClick()}
//       >add Video</Button>
//       <div id="hidden">
//       <InputGroup size="sm" className="mb-3">
//         <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
//         <Form.Control
//           aria-label="Small"
//           aria-describedby="inputGroup-sizing-sm"
//         />
//       </InputGroup>
//       <InputGroup size="sm" className="mb-3">
//       <InputGroup.Text id="inputGroup-sizing-sm">Url</InputGroup.Text>
//       <Form.Control
//         aria-label="Small"
//         aria-describedby="inputGroup-sizing-sm"
//       />
//     </InputGroup>
//     <br/>
//     <Button variant="warning">Cancel</Button>
//         <Button variant="danger">Add</Button>
//         </div>
//       </Col>
//         <Col>
//         <InputGroup size="sm" className="mb-3">
//         <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
//         <Form.Control
//           aria-label="Small"
//           aria-describedby="inputGroup-sizing-sm"
//         />
//       </InputGroup>
      
//         </Col>
        
//       </Row>

//       </Container>
//       <AddVideo />
//             {data.map(item =>(
//               <Video info = {item}>
//               </Video>
//             ))}
//     </div>
//   );
// }

// export default App;


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
          <div>
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
      <Button variant="Cancle">cancel</Button>
      <Button variant="Add">Add</Button>
</div>)}
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