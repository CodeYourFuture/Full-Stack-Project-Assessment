import data from "../exampleresponse.json";


const MainCard = () => {
    return(
        <div>
            <ul>
             {data.map((video) => {
                return(
             <div>
            <li key = {video.id} >
            <p>{video.title}</p>
            {<iframe width="560" height="315" src={video.url.replace("watch?v=", "embed/")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
           <p>{video.rating}</p>
           <p>
            <button><i class='fa fa-thumbs-up'></i></button>
            <button><i class='fa fa-thumbs-down'></i></button></p>
           
          </li>
             
            
             </div> 
             )})}
            </ul>
        </div>
    )

}

export default MainCard;