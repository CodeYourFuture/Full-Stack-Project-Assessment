import React, { useEffect, useState } from "react";
import AddModal from "../../components/AddModal";
import VideoCards from "../../containers/VideoCards";


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


    const getVideos = () => {
        fetch(" http://127.0.0.1:5000/")
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
            <AddModal onSave={handleSaveNewVideo} refresh={refreshModal} errorMessage={error} />
            <VideoCards videos={videos} onVideoUpdate={() => getVideos()} />
        </main>
    )
}

export default Home;