import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Videos() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <Container>
      <Row>
        <Col>
        <a href=' '>Add Video</a>
        <form>
          <label>TITLE</label>
          <input type='text'></input><br />
          <label>URL</label>
          <input type='text'></input>
        </form>
        <button className='cancel-button'>Cancel</button>
        <button className='add-button'>Add</button>

        </Col>
        <Col>
        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
        </Col>
      </Row>
    </Container>
  );
}

export default Videos;