import React from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const AddBar = () => {
  return (
    <div>
      <h1>hello from addbar</h1>
      <Form className="col-sm-9 col-md-6 col-lg-4">
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>

        <Form.Group controlId="formBasicUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddBar;
