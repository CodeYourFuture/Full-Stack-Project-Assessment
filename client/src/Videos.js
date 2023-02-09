import Embed from "./Embed.js";


function Video({ videoData, video, setVideoData })
{
    const deleteFunction = (id) => 
    {
        fetch('http://192.168.0.15:5000/videos/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((data) => setVideoData(data))
            .catch((err) => console.log(err.message));
    }

    return (
        <div className="container" id={video.id}>
            <h1>{video.title}</h1>
            <button id="delete" onClick={() => deleteFunction(video.id)}>Delete</button>

            <Embed video={video} />
        </div>
    );
}

export default Video