import React, { useState } from "react";
import { CDBBtn } from "cdbreact";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";

function InputForm({
  url,
 title,
  handleTitleChange,handleUrlChange,
  handleSubmit,
}) {
  return (
    <Form className="form" onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
      </FormGroup>

      <div className="btn-section">
        <CDBBtn color="primary" circle type="submit">
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
