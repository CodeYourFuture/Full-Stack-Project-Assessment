import React from "react";
import { useGlobalContext } from "../context";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const Video = () => {
    const { data, setData, updateData } = useGlobalContext();
    const upVote = (rating,id) => {
        let updatedData = data.map((element) => element.id !== id ? element : { id: element.id , title: element.title, url: element.url, rating: rating + 1} )
        setData(updatedData);
    }
    const downVote = (rating,id) => {
        let updatedData = data.map((element) => element.id !== id ? element : { id: element.id , title: element.title, url: element.url, rating: rating - 1} )
        setData(updatedData);
    }
    const remove = (id) => {
        const filteredData = data.filter(video => video.id === id ? !video : video )
        setData(filteredData)
    }
    return (
        <div className="col video">
            {updateData.map((video) => {
                const { id, title, url, rating } = video;
                const videoId = url.split('v=');
                return (
                    <div key={id}>
                        <div className="mx-auto" style={{ width:"26rem", height:"22rem"}}> 
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId[1]}`}
                            title="YouTube video player"
                            style={{ width: "90%", height: "90%" }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                        </div>
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">{title}</h5>
                            <p>
                                <span>{rating}</span>
                                <FaThumbsUp color="green" onClick={() => upVote(rating ,id)}/>
                                <FaThumbsDown color="red" onClick={() => downVote(rating ,id)} />
                            </p>
                        </div>
                            <button className="btn btn-danger mb-3" onClick={() => remove(id)}>Delete</button>
                    </div>

                )
            })}
        </div>
    )
};

export default Video;