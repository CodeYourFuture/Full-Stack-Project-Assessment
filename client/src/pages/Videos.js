import { AppContext } from "../App";
import { useState, useEffect, useContext } from "react";
import AddVideo from "../components/AddVideo";
import VideosContainer from "../components/VideosContainer";

export default function Videos() {
    const apiURL = useContext(AppContext);
    const token = localStorage.getItem("token");

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            const res = await fetch(`${apiURL}/api/videos`, {
                headers: { "x-auth-token": token }
            });
            const data = await res.json();

            if (data.message === "success") {
                setVideos(data.videos);
            } else {
                alert(data.message);
            }
        }

        getVideos();
    }, [apiURL, token]);

    const addVideo = (video, id) => {
        video.id = id;
        setVideos([...videos, video]);
    }

    const deleteVideo = async (id) => {
        const res = await fetch(`${apiURL}/api/videos/${id}`, {
            method: "DELETE",
            headers: { "x-auth-token": token }
        });
        await res.json();

        setVideos(videos.filter(video => video.id !== id));
    }

    const incRating = async (id) => {
        const res = await fetch(`${apiURL}/api/videos/${id}/inc-rating`, {
            method: "PATCH",
            headers: { "x-auth-token": token }
        });
        await res.json();

        setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating + 1 }));
    }

    const decRating = async (id, rating) => {
        if (rating > 0) {
            const res = await fetch(`${apiURL}/api/videos/${id}/dec-rating`, {
                method: "PATCH",
                headers: { "x-auth-token": token }
            });
            await res.json();

            setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating - 1 }));
        }
    }

    return (
        <>
            <AddVideo addVideo={addVideo} />
            <VideosContainer videos={videos} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
        </>
    );
}