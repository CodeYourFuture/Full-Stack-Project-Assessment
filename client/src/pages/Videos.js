import { AppContext } from "../App";
import { useState, useEffect, useContext } from "react";
import jwt from "jwt-decode";
import AddVideo from "../components/AddVideo";
import VideosContainer from "../components/VideosContainer";

export default function Videos() {
    const apiURL = useContext(AppContext);

    const token = localStorage.getItem("token");
  const { uId } = jwt(token);

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            try {
                const res = await fetch(`${apiURL}/api/videos/user/${uId}`, {
                    headers: { "x-auth-token": token }
                });
                const data = await res.json();

                if (res.status === 200) {
                    setVideos(data.videos);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getVideos();
    }, [apiURL, token, uId]);

    const addVideo = (video, id) => {
        video.id = id;
        setVideos([...videos, video]);
    }

    const deleteVideo = async (id) => {
        try {
            const res = await fetch(`${apiURL}/api/videos/${id}`, {
                method: "DELETE",
                headers: { "x-auth-token": token }
            });

            const data = await res.json();

            if (res.status === 200) {
                setVideos(videos.filter(video => video.id !== id));
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const incRating = async (id) => {
        try {
            const res = await fetch(`${apiURL}/api/videos/${id}/inc-rating`, {
                method: "PATCH",
                headers: { "x-auth-token": token }
            });

            const data = await res.json();

            if (res.status === 200) {
                setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating + 1 }));
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const decRating = async (id, rating) => {
        if (rating > 0) {
            try {
                const res = await fetch(`${apiURL}/api/videos/${id}/dec-rating`, {
                    method: "PATCH",
                    headers: { "x-auth-token": token }
                });

                const data = await res.json();

                if (res.status === 200) {
                    setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating - 1 }));
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <>
            <AddVideo addVideo={addVideo} />
            <VideosContainer videos={videos} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
        </>
    );
}