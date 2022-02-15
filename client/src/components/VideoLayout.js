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
                    <h1>Video Recommendation</h1>
                </div>
                <div className="d-flex align-items-center col-md-5">
                    <button
                        variant="Dark"
                        type="button"
                        onClick={sortButton}
                        className="col-md-10"
                        style={{ color:"#00005c", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
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