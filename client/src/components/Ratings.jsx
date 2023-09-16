import React from "react";

function Rating(props) {
    console.log('hello')
    console.log(props, 'this')
    
    return (
    <h2>{props.rating}</h2>
    )
    
}
export default Rating 