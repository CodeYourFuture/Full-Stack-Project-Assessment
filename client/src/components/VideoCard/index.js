import React from "react";
import "./videoCard.css";

function VideoCard(props) {
    const { id, title, url, rating, onLike, onDislike, onDelete } = props
    return (
        <div className="video-card">
            <iframe className="video-card__video"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            <div className="video-card__footer">
                <h6 className="footer__title">{title}</h6>
                <div className="footer__actions">
                    <i className="far fa-thumbs-up" onClick={() => onLike(id)}>{rating}</i>
                    <i className="far fa-thumbs-down" onClick={() => onDislike(id)}></i>
                    <button className="footer__delete" onClick={() => onDelete(id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;