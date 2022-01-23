import React from "react"
import examples from "./exampleresponse.json"
import Video from "./Video";

const VideoList = () => {

    const data = examples;

    const deleteHandler=(e)=> {
        console.log(e.target.id);
    }

    return ( 
        <div>
            <ul>
                {data.map((example)=> {
                    return <Video id={example.id} title={example.title} url={example.url.replace("watch?v=","embed/")} rating={example.rating} key={example.id} delete={deleteHandler}/>
                })}
            </ul>
        </div>
     );
}
 
export default VideoList;