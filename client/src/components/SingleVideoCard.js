import React, { useState } from 'react'

const SingleVideoCard = ({ video, handleDelete }) => {
    const { id, title, url, rating } = video;

    const [vote, setVote] = useState(rating);
    const embedUrl = url.split("=");

    return (
        <div className="col">
            <div className="card align-items-center h-100">
                <h5 className=" title my-2 mb-3 fst-italic text-decoration-underline">{title}</h5>
                <div className="d-flex justify-content-center align-items-center">
                    <i
                        className="fas fa-thumbs-up vote fs-1 voteUp"
                        onClick={() => setVote(vote + 1)}>

                    </i>
                    <h4 className="mx-4">{vote} votes</h4>
                    <i
                        className="fas fa-thumbs-down vote fs-1 voteDown"
                        onClick={() => setVote(vote - 1)}>

                    </i>
                </div>
                <div className="card-body w-100">
                    <iframe width="360" height="300" src={`https://www.youtube.com/embed/${embedUrl[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <button
                    className="btn btn-danger col-md-4 mb-3"
                    type="button"
                    onClick={() => handleDelete(id)} >Delete
                </button>
            </div>
        </div>
    )
}

export default SingleVideoCard
