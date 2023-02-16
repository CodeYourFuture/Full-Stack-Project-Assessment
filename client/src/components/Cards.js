import React from "react";
import { Video } from "./Video";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ExampleResponse from  "../data/exampleresponse.json"


let datas = ExampleResponse;

export const Cards = (props) => {

  if(props.newVideo.url !== undefined){
    datas.push(props.newVideo)
  }
  console.log(datas)
  
    return (
        <Container>
          <Row>
            {datas.map(val => {
              console.log("elemetn")
                return <Video    
                url ={val.url}
                title = {val.title}
                />
            })}
            
          </Row>
        </Container>
      );
}