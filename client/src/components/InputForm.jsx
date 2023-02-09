import React from "react";
import { CDBBtn } from "cdbreact";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";


function InputForm() {



  return (
    <Form className="form">
      <FormGroup>
        <label for="title">Title</label>
        <input id="title" name="title" type="text" />
      </FormGroup>
      <FormGroup>
        <label for="url">URL</label>
        <input id="url" name="url" type="text" />
      </FormGroup>

      <div className="btn-section">
        <CDBBtn color="primary" circle>
          Add Video
        </CDBBtn>

        <CDBBtn color="danger" circle outline>
          Remove
        </CDBBtn>
      </div>
    </Form>
  );
}

export default InputForm;
