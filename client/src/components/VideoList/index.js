import React from "react";
import Video from "../Video";
import styles from "./index.module.css";

const VideoList = (props) => {
    const {videos, handleDeleteVideo} = props;

    return (
        <div className={styles.container}>
            {videos.map(video => {
                return <Video video={video} key={video.id} handleDeleteVideo={handleDeleteVideo}/>
            })}
        </div>
    );
}

export default VideoList;