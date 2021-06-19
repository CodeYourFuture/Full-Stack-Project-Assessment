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
        // const filteredData = data.filter(video => video.id === id ? !video : video)
        // setData(filteredData)

        const requestOptions = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        };
        fetch(`http://localhost:5000/${id}`, requestOptions)
            .then((res) =>  res.json())
            .then(data => setData(data))
    }
    return (
        <div className="col video ">
            {updateData.sort(function (a, b) { return b.rating - a.rating }).map((video) => {
                const { id, title, url, rating, date } = video;
                const videoId = url.split('watch?v=');
                const videostyle = 
                    {
                        width:"76%",
                        height:"99%",
                        border:"2px black solid", 
                        textAlign:"center", 
                        backgroundColor:"#254e70",
                        borderRadius:"10px",
                        margin:"30px"
                        }
                
                return (
                    <div key={id} className="flex-column" 
                    style={videostyle}>
                        <div className="m-3" style={{height:"40%"}}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId[1]}`}
                                title="YouTube video player"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                style={{ width: "100%", height: "100%",border: "3px red solid",borderRadius:"20px" }}
                                ></iframe>
                        </div>
                        <div className="media-body flex-column ml-3 mt-2" style={{ width: "90%",height:"42%", border:"2px black solid", borderRadius:"10px" }}>
                            <div><h3 className="m-2 fs-6 ">{title}</h3></div>
                            <div className="d-flex justify-content-around mt-3">
                                <div className="m-3">
                                    <FaThumbsUp style={{ cursor: "pointer" }} color="green"  size="20px"  onClick={() => upVote(rating, id)} />
                                    <span className="m-3"> {rating}</span>
                                    <FaThumbsDown color="red" size="20px" style={{ cursor: "pointer", marginLeft:"15px" }} onClick={() => downVote(rating, id)} />
                                </div>
                                {date !== undefined ? <div><p className="mr-3 fs-6 post">Posted At {date}</p></div> :
                                 <div><p className="m-3 fs-6 post ">Posted at: <br></br> long time ago</p></div>}
                            </div>
                        </div>
                                <button className="btn btn-danger m-2" onClick={() => remove(id)}>Delete</button>
                    </div>

                )
            })}
        </div>
    )
};

export default Video;