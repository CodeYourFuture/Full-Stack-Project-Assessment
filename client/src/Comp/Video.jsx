import data from "../Data/data.json"
const Video = ()=>{
    return(
        <>
        {data.map(el=>
            <div>
                <h3>{el.title}</h3>
                <iframe title={el.title} src={el.url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                <span>{el.rating}</span>
                <button>Delete the video</button>
            </div>
        )}
        </>
    )
}
export default Video;