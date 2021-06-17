import React from "react";
import { useGlobalContext } from "../context";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const Video = () => {
    const { data, setData, updateData } = useGlobalContext();
    const upVote = (rating, id) => {
        let updatedData = data.map((element) => element.id !== id ? element : { id: element.id, title: element.title, url: element.url, rating: rating + 1 })
        setData(updatedData);
    }
    const downVote = (rating, id) => {
        let updatedData = data.map((element) => element.id !== id ? element : { id: element.id, title: element.title, url: element.url, rating: rating - 1 })
        setData(updatedData);
    }
    const remove = (id) => {
        const filteredData = data.filter(video => video.id === id ? !video : video)
        setData(filteredData)
    }
    return (
        <div className="col video ">
            {updateData.reverse().map((video) => {
                const { id, title, url, rating } = video;
                const videoId = url.split('watch?v=');
                return (
                    <div key={id} className="flex-column d-block ">
                        <div className="m-3 " style={{ width: "30rem", height: "25rem", border: "3px red solid" }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId[1]}`}
                                title="YouTube video player"
                                style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </div>
                        <div className="media-body flex-column" style={{width:"93%"}}>
                            <div><p className="mt-0 mb-1 ml-2 fs-6 ">{title}</p></div>
                            <div className="d-flex justify-content-around">
                                <div className="mr-2 ml-2"><FaThumbsUp style={{ cursor: "pointer" }} color="green" onClick={() => upVote(rating, id)} />
                                <span className="mr-2 ml-2">{rating}</span>
                                <FaThumbsDown color="red" style={{ cursor: "pointer" }} onClick={() => downVote(rating, id)} /></div>
                                <button className="btn btn-danger mb-3 mr-2" onClick={() => remove(id)}>Delete</button>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )
};

export default Video;