import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { vidContext } from '../contexts/YoutubeVidContext';
import Search from './Search';
import styled from 'styled-components';

const FormContainer =styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 768px) {
      flex-direction: column;
    }
`
const FormButtons =styled.div`
    display: flex;
    flex-direction: row;
`
const ToggleButton = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     width: 50%;
`
const FormInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.8rem;
`
const FormInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Herf = styled.a`
    font-style: normal;
    text-decoration:none;
    font-size:1.2rem;
`;
const Paragraph = styled.p`
margin-bottom: none;`;

const Form = styled.form`
`;
const FormWrapper = styled.div`
    margin: 1rem;
`;
// const CannelButton = styled.Button`
// padding
// `;


export default function YoutubeForm (){
  const { addVideo } = useContext(vidContext);
  const [ title, setTitle ] = useState("");
  const [ vid, setVid ] = useState("");
  const [show,setShow] = useState(false);

    const handleSubmit = e => {
      e.preventDefault();
      if (!vid && !title) return;
      addVideo(title, vid); 
    };
  
  return (
    <FormContainer>
    <ToggleButton >
      <FormWrapper>
        <Herf href='#0'  onClick={()=>{setShow(true)}} style={{fontStyle:'normal',textDecoration:'none',fontSize:'1.2rem'}}>Add video</Herf>
        {show?
        <Form onSubmit={handleSubmit}>
          <FormInputWrapper>
            <Paragraph>Title</Paragraph>
            <FormInput type ="text" value={title} onChange ={(e)=>setTitle(e.target.value)} placeholder='Add video title ...' required/>
          </FormInputWrapper>
          <FormInputWrapper>
            <Paragraph>URL</Paragraph>
            <FormInput type ="text" value={vid} onChange ={(e)=>setVid(e.target.value)} placeholder='Add video link ..'required />  
          </FormInputWrapper>
      <FormButtons>
        <Button variant ="outlined" color="warning" size='small' height='small' type='cancel' onClick = {()=>{setShow(false)}}>Cancel</Button>
        <Button variant="contained" type="submit"  >Add vidoe</Button>
      </FormButtons>
  
    </Form> : null}
    </FormWrapper>
    </ToggleButton>
    <Search />
    </FormContainer>
  )
}


