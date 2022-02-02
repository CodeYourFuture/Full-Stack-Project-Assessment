import Video from "../components/Video";

const VideoLayout = ({ searchingInfo, videoInfo, sortButton, setVideoInfo }) => {
    const handleDelete = (id) => {
        const filteredVideoInfo = videoInfo.filter((video) => video.id !== id);
        setVideoInfo(filteredVideoInfo);
    };

    return (
        <div className="video-container">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <h1>MeTube : Video Recommendation</h1>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        class="btn btn-success"
                        onClick={sortButton}
                    >
                        Sort
                    </button>
                </div>
            </div>
                {searchingInfo.map((video) => (
                    <Video video={video} key={video.id} handleDelete={handleDelete} />
                ))}
        </div>
    );
};


export default VideoLayout;