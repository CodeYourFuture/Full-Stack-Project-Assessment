import "./App.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Video from "./Video";
import AddVideo from "./AddVideo";
import data from '../src/exampleresponse.json';

function App() {
   


  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Container>
      <Row>
      <Col>
      <Button variant="link" id="addvideo"
      >add Video</Button>
      <div id="hidden">
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <InputGroup size="sm" className="mb-3">
      <InputGroup.Text id="inputGroup-sizing-sm">Url</InputGroup.Text>
      <Form.Control
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
      />
    </InputGroup>
    <br/>
    <Button variant="warning">Cancel</Button>
        <Button variant="danger">Add</Button>
        </div>
      </Col>
        <Col>
        <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      
        </Col>
        
      </Row>

      </Container>
      <AddVideo />
            {data.map(item =>(
              <Video info = {item}>
              </Video>
            ))}
    </div>
  );
}

export default App;
