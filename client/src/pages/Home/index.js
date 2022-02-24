import React, { useEffect, useState } from "react";
import AddModal from "../../components/AddModal";
import VideoCards from "../../containers/VideoCards";
import SearchBar from "../../components/SearchBar";

function Home() {
    const [videos, setVideos] = useState([]);
    const [refreshModal, setRefreshModal] = useState(0);
    const [error, setError] = useState("")

    const handleSaveNewVideo = (video) => {
        fetch("http://127.0.0.1:5000",

            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: JSON.stringify(video),

            }).then((result) => result.json())
            .then(data => {
                if (data.msg) {
                    setError(data.msg);
                } else {
                    getVideos();
                    setError("");
                    setRefreshModal(refreshModal + 1)
                }
            })
    }

    const handleChange = (values) => {
        getVideos(values);
    }

    const getVideos = (query) => {

        let url = "http://127.0.0.1:5000/"

        if (query?.sort) {
            url += `?sort=${query.sort}`
        }

        if (query?.search) {
            url += `&search=${query.search}`
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setVideos(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <main className="home">
            <SearchBar onChange={handleChange} />
            <AddModal onSave={handleSaveNewVideo} refresh={refreshModal} errorMessage={error} />
            <VideoCards videos={videos} onVideoUpdate={() => getVideos()} />
        </main>
    )
}

export default Home;