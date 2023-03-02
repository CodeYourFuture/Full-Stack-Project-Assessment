import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from './Form';



function Videos() {
  const [searchTerm, setSearchTerm] = useState("");
  
  
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
 
  return (
    
    <Container>
      <Row>
        <Col>
        <a href=' '>Add Video</a>
        <Form />
        </Col>
        <Col>
        <label>Search</label>
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