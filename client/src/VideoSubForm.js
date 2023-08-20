import { useState } from "react";
import styled from "styled-components";

const VideoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel>
        Title:
        <FormInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormLabel>
      <FormLabel>
        YouTube URL:
        <FormInput type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </FormLabel>
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
};

export default VideoForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;
