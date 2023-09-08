import React from "react";
function Videocard (props) {
return (
    <div>
    <h1>{props.name}</h1>
    <p>{props.link}</p>
    </div>
)
}
export default Videocard;