import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Videos } from "./Videos";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";



export const VideoCards = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const res = await axios.get("http://localhost:3030/videos");
                setVideos(res.data);
                console.log(res);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchAllVideos();
    }, []);

    return (
        <Container>
            <Row>
                {videos.map((video) => (
                    <Videos
                        url={video.url}
                        title={video.title}
                        rating={video.rating}
                        key={video.id}
                    />
                ))}
            </Row>
        </Container>
    );
}
