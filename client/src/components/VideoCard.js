import React, { useState } from 'react';

const VideoCard = ({ data }) => {
    let [vote, setVote] = useState(0);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-3">
            {data.map((item, index) => {
                const { id, title, url } = item
                return (
                    <div key={index} className="col">
                        <div className="card align-items-center h-100">
                            <h5 className=" title my-2 mb-3 fst-italic text-decoration-underline">{title}</h5>
                            <div className="d-flex justify-content-center align-items-center" value={id}>
                                <i className="fas fa-thumbs-up vote fs-1 voteUp" onClick={() => setVote(vote + 1)}></i>
                                <h4 className="mx-4">{vote} votes</h4>
                                <i className="fas fa-thumbs-down vote fs-1 voteDown" onClick={() => setVote(vote - 1)}></i>
                            </div>
                            <div className="card-body">
                                <video controls>
                                    <source src={url}
                                        type="video/webm"></source>
                                    Sorry, your browser doesn't support embedded videos.
                                </video>
                            </div>
                            <button type="button" className="btn btn-danger col-md-4 mb-3">Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default VideoCard
