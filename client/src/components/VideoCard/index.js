import React from "react";
import "./videoCard.css";

function VideoCard(props) {
    const { title, url, rating } = props
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

                </div>
            </div>
        </div>
    )
}

export default VideoCard;