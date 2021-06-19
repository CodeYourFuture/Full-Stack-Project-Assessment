import SingleVideo from "./SingleVideo";


const DisplayVideo = ({videoData, filteredData, setVideoData}) => {    
    
    const handleDeleteVideo = (id) => {
        const newData = videoData.filter(video => video.id !== id);
        setVideoData(newData);
        console.log(newData)
    }

    return (
        <div className="row">        
            {filteredData.map((video, index) => (           
                <SingleVideo 
                    video={video} 
                    key={index}
                    handleDeleteVideo={handleDeleteVideo}
                />
            ))}          
        </div>
    );
}

export default DisplayVideo;