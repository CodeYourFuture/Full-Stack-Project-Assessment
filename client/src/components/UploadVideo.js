import React, { useState } from "react";

const UploadVideo = ({ videoInfo , setVideoInfo }) => {
    const [uploadVideo , setUploadVideo] = useState(false);
    const [videoTitle , setVideoTitle] = useState("");
    const [url , setUrl] = useState("");


    const handleVideoUpload = (e) => {
        e.preventDefault();

        const videoId = Math.floor(Math.random() * 1000000);
        const rating= Math.floor(Math.random() * 1000);

        const newVideo = {
            id: videoId,
            title: videoTitle,
            url: url,
            rating: rating,
            timeSent: new Date().toLocaleString(),
        };
        newVideo.title && newVideo.url 
        ? setVideoInfo(videoInfo.concat(newVideo))
        : alert("Please fill in all fields");
    };
    return (
        <header>
            <h4 onClick={() => setUploadVideo(!uploadVideo)}>Upload Video</h4>
            {
                <form>
                    <div>
                        <label>
                            Title:
                            <input
                            onChange={(e) => setVideoTitle(e.target.value)}
                            type="text"
                            placeholder="Enter video title"
                            className="form-control"
                            required
                            />

                        </label>

                    </div>

                    <div>
                        <label>
                            Url:
                            <input
                            onChange={(e) => setUrl(e.target.value)}
                            type="text"
                            placeholder="Enter video url"
                            className="form-control"
                            required
                            />
                            </label>
                    </div>

                    <div>
                        <button
                        onClick={() => setUploadVideo(!uploadVideo)}
                        className="btn btn-danger"
                        type="canel"
                        style={{color:"#00005c", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
                        >
                            Cancel
                        </button>

                        <button
                        onClick={handleVideoUpload}
                        className="btn btn-primary"
                        type="submit"
                        style={{ color:"#00005c", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
                        >
                            Upload
                        </button>
                    </div>
                    
                </form>

            }
        </header>
    )
}


export default UploadVideo;
