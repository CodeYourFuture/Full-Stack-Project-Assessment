import { useState } from "react";


function Video({ data, video, setVideoData })
{
    const deleteFunction = (data, id) => 
    {
        //document.getElementById(id).remove();

        fetch('http://192.168.0.15:5000/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((data) => setVideoData(data))
            .catch((err) => console.log(err.message));

        //setVideoData(data.filter(data => data.id !== id))
    }

    return (
        <div className="container" id={video.id}>
            <h1>{video.title}</h1>
            <button id="delete" onClick={() => deleteFunction(data, video.id)}>Delete</button>

            <Embed video={video} data={data} />
        </div>
    );
}








const Embed = ({ video, data, sortData }) => 
{
    const url = video.url.replace("watch?v=", "embed/");
    const [rating, setRating] = useState(video.rating);
    const [hasVoted, setHasVoted] = useState(false);

    const upVote = () => 
    {
        if (!hasVoted)
        {
            setRating(rating + 1);
            setHasVoted(true);
        }
    }

    const downVote = () => 
    {
        if (!hasVoted)
        {
            setRating(rating - 1);
            setHasVoted(true);
        }
    }


    return (
        <div>
            <iframe width="auto" height="auto" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

            </iframe>
            <p>Rating: {rating}</p>
            <button id="up" onClick={upVote} disabled={hasVoted}>Like</button>
            <button id="down" onClick={downVote} disabled={hasVoted}>Dislike</button>
        </div>);
}

export default Video