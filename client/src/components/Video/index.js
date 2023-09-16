import {Button, Typography} from 'antd';
import React from "react";
import styles from "./index.module.css";

const {Text} = Typography;
const Video = (props) => {
    const {video: {id, title, url, rating: videoRating, timestamp}, handleDeleteVideo} = props;
    const [rating, setRating] = React.useState(videoRating);

    const videoId = url.split("v=")[1].substring(0, 11);

    const handleUpVote = () => {
        setRating(rating + 1);
    }
    const handleDownVote = () => {
        setRating(rating - 1);
    }

    return (
        <div className={styles.container}>
            <Typography.Title level={3} className={styles.title}>
                {title}
            </Typography.Title>
            <div className={styles.actions}>
                <div className={styles.rating}>
                    <Text type="primary">Rating: </Text><Text strong>{rating} votes</Text>
                    <Button type="text" className={styles.voteBtn} onClick={handleUpVote} title="vote up">
                        &#128077;
                    </Button>
                    <Button type="text" className={styles.voteBtn} onClick={handleDownVote}
                            title='vote down'>&#128078;</Button>
                </div>
                <Button type="dashed" onClick={() => handleDeleteVideo(id)}>Delete video</Button>
            </div>
            <div className={styles.video}>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title={title}>
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    >
                </iframe>
            </div>
            {timestamp && <Text type="secondary">Uploaded on: {timestamp.toLocaleString()}</Text>}
        </div>
    );
}

export default Video;