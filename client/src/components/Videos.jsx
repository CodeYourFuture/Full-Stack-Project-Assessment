import { useEffect, useState } from 'react';


const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos');
                const data = await response.json();
                setVideos(data.videos);
                console.log(data)
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            
            <ul>
                {videos.map((video, index) => (
                    <li key={index}>
                        <a href={video.src} target="_blank" rel="noopener noreferrer">
                            {video.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Videos;
