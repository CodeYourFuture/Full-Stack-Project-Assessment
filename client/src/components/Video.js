import React, { useState } from "react";
import { useGlobalContext } from "../Context"
import ReactPlayer from "react-player"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Video = () => {
    const { data, setData, keyword } = useGlobalContext();

    console.log(data);

    const votePlus = (id) => {
        const updatedArray = data.map(element => {
            console.log(element)
            return element.id === id ? { id: element.id, title: element.title, url: element.url, rating: element.rating += 1 } : element
        })
        setData(updatedArray)
    }

    const voteNegative = () => {

    }

    function deleteVideo(id) {
        const deletedVideoArray = data.filter(element => {
            return element.id !== id ? element : !element
        })
        setData(deletedVideoArray)
    }
    console.log(data)

    return (
        <div className="row">
            {data
                .filter(element => element.title.toLowerCase().includes(keyword.toLowerCase()))
                .map(element => {
                    const { id, title, url, rating } = element
                    const videoId = url.split("=");
                    const urlVideo = `https://www.youtube.com/embed/${videoId[1]}`
                    return (
                        <div key={id} className="media col-m-3 p-1 list-group-item ">
                            <iframe width="560" height="315" src={urlVideo} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{title}</h5>
                                <p>
                                    <FaThumbsDown color="red" onClick={() => { voteNegative(id) }} />
                                    {rating}
                                    <FaThumbsUp color="green" onClick={() => { votePlus(id) }} />
                                </p>
                                <button className="btn btn-danger" onClick={() => { deleteVideo(id) }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}


export default Video;