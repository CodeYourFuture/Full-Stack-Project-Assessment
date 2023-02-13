import React, { useState } from "react";
import { CDBBtn } from "cdbreact";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import data from "../data/dataArray";
//import data2 from "../data/exampleresponse.json";
//console.log(data);

function InputForm() {
  const [video, setVieo] = useState({
    title: "",
    url: "",
  });

  const handleChanges = (e) => {
    const fildname = e.target.name;
    const value = e.target.value;
    //console.log({ fildname, value });
    setVieo((currentVideo) => {
      return { ...currentVideo, [fildname]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(video);
    data.push(video);
  };

  return (
    <Form className="form">
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input onChange={handleChanges} id="title" name="title" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="url">URL</label>
        <input onChange={handleChanges} id="url" name="url" type="text" />
      </FormGroup>

      <div className="btn-section">
        <CDBBtn onClick={handleSubmit} color="primary" circle>
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
