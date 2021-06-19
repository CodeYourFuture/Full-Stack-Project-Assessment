// eslint-disable-next-line
import React, { useState } from "react";
function VideoData(props) {
    const oneVideoData = props.oneVideo;
    return (
        <div className="col-4  mt-5">
            <h5>{oneVideoData.title}</h5>
            <div className="row d-flex justify-content-center">
                <i className="fa fa-thumbs-up fa-custom"></i>
                <h5 className="pr-3 pl-3 mb-5"> 0 votes </h5>
                <i className="fa fa-thumbs-down fa-custom"></i>
            </div>
            <iframe width="360" height="215" src={oneVideoData.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    );
}
export default VideoData;