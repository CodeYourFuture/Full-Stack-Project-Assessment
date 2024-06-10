// components/VideoForm.js
import { useState } from 'react';

const VideoForm = ({ addVideo }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && url) {
            addVideo({ title, src: url });
            setTitle('');
            setUrl('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type your video"
                    required
                />
            </div>
            <div>
                <label>YouTube URL:</label>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL"
                    required
                />
            </div>
            <button type="submit">Add New Video</button>
        </form>
    );
};

export default VideoForm;
