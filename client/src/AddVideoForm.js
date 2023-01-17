import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddVideoForm = () => {
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="title..." />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control type="url" placeholder="url..." />
              </Form.Group>
            </Col>
          </Row>
          <Button className=" mt-3 mb-3" variant="primary" type="submit">
            ADD
          </Button>
          <Button className="ml-5 mt-3 mb-3" variant="danger" type="submit">
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddVideoForm;
