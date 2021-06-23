import React, { useState } from "react";
import { useGlobalContext } from "../Context"
import ReactPlayer from "react-player"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Video = () => {
    const { data, setData, keyword } = useGlobalContext();
    const votePlus = (id) => {
        const updatedArray = data.map(element => {
            console.log(element)
            return element.id === id ? { id: element.id, title: element.title, url: element.url, rating: element.rating += 1 } : element
        })
        setData(updatedArray)
    }

    const voteNegative = (id) => {
        const updatedArray = data.map(element => {
            console.log(element)
            return element.id === id ? { id: element.id, title: element.title, url: element.url, rating: element.rating -= 1 } : element
        })
        setData(updatedArray)
    }

    function deleteVideo(id) {
        const deletedVideoArray = data.filter(element => {
            return element.id !== id ? element : !element
        })
        setData(deletedVideoArray)
        console.log(data)
    }

    return (
        <div className="row justify-content-around align-items-center">
            {data
                .sort((a, b) => b.rating - a.rating)
                .filter(element => element.title.toLowerCase().includes(keyword.toLowerCase()))
                .map(element => {
                    const { id, title, url, rating } = element
                    const videoId = url.split("=");
                    const urlVideo = `https://www.youtube.com/embed/${videoId[1]}`
                    return (
                        <div key={id} className="m-3 p-3 col-3 border border-primary">
                            <div className="media-body">
                                <h6 className="header-six mt-2 mb-1">{title}</h6>
                                <p>
                                    <FaThumbsDown className=" fa-thumbs mt-2" color="red" onClick={() => { voteNegative(id) }} />
                                    {rating}
                                    <FaThumbsUp className="fa-thumbs mt-2" color="green" onClick={() => { votePlus(id) }} />
                                </p>
                            </div>
                            <iframe className="w-75 h-75" src={urlVideo} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div>

                                <button className="btn btn-danger" onClick={() => { deleteVideo(id) }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}


export default Video;