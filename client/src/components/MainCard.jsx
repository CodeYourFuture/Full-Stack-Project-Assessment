import data from "../exampleresponse.json";

const MainCard = () => {
    return(
        <div>
            <ul>
             {data.map((video) => {
                return(
             <div>
            <li key = {video.id} ></li>
            <li>{video.title}</li>
            <li>{<iframe width="560" height="315" src={video.url.replace("watch?v=", "embed/")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}</li>
            <li>{video.rating}</li>
             
            
             </div> 
             )})}
            </ul>
        </div>
    )

}

export default MainCard;