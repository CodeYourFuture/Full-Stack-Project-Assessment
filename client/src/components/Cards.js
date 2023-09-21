import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import VideoCard from "./VideoCard";

const Cards = (props) => {
    console.log(props);
     return (
       <Container>
         <Row>
            {props.videos.map((item) => {
                return <VideoCard url = {item.url} key = {item.id}/>
            })}
         </Row>
       </Container>
     );
}

export default Cards;