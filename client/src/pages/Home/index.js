import React from "react";
import AddButton from "../../components/AddButton";
import VideoCards from "../../containers/VideoCards";


function Home() {

    return (
        <main className="home">
            <AddButton />
            <VideoCards />
        </main>
    )
}

export default Home;