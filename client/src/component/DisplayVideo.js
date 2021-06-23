import SingleVideo from "./SingleVideo";


const DisplayVideo = ({videoData, setVideoData, search}) => {    

    const sortedData = videoData.sort((video1, video2) => (video2.rating) - (video1.rating))
                              .filter((video) => video.title.toUpperCase().includes(search.toUpperCase()));

  
    
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