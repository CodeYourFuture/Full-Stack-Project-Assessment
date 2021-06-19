import SingleVideo from "./SingleVideo";


const DisplayVideo = ({videoData, sortedData, setVideoData}) => {    
    
    const handleDeleteVideo = (id) => {
        const newData = videoData.filter(video => video.id !== id);
        setVideoData(newData);
        console.log(newData)
    }

    return (
        <div className="row">        
            {sortedData.map((video) => (           
                <SingleVideo 
                    video={video} 
                    key={video.id}
                    handleDeleteVideo={handleDeleteVideo}
                />
            ))}          
        </div>
    );
}

export default DisplayVideo;