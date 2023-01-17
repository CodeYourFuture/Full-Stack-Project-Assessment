import { useState } from "react";


function Video({ data, video, setVideoData })
{
    const deleteFunction = (data, id) => 
    {
        setVideoData(data.filter(data => data.id !== id))
    }

    return (
        <div className="container">
            <h1>{video.title}</h1>
            <button id="delete" onClick={() => deleteFunction(data, video.id)}>Delete</button>

            <Embed video={video} />
        </div>
    );
}








const Embed = ({ video }) => 
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