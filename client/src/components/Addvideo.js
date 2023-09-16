import React from "react";

function Addvideo (props) {

    function getTitle (event) {
    setEnterTitle(event.target.value)

}

    return (<div>
        <form>
            <label for="Video title">Video Title</label>
            <input id="Video title" type="text" onChange={getTitle}/>

            <label for="Video link">Video link</label>
            <input id="Video link" type="text" onChange={getUrl}/>


            <input id="Submit" type="submit" onClick={submitInfo}/>
            
        </form>
    </div>)
}
export default Addvideo;