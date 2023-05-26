import data from "../Data/data.json"
import "./Video.css"
const Video = ()=>{
    return(
        <div className="vid-contaner">
        {data.map(el=>
            <div className="vidBox">
                <h3>{el.title}</h3>
                <iframe title={el.title} src={el.url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                <div className="rate-delete">
                    <span>video rate : {el.rating}</span>
                    <button>Delete the video</button>
                </div>
            </div>
        )}
        </div>
    )
}
export default Video;