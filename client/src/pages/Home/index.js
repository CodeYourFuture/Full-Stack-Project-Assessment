import React from "react";
import AddModal from "../../components/AddModal";
import VideoCards from "../../containers/VideoCards";


function Home() {
    const handleSaveNewVideo = (video) => {
        console.log(video)
    }
    return (
        <main className="home">
            <AddModal onSave={handleSaveNewVideo} />
            <VideoCards />
        </main>
    )
}

export default Home;