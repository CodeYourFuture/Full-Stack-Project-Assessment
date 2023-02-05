import { useRef, useState } from "react";


const Add=()=>{
    const title= useRef();
    const url=useRef();

    const [showStatus ,setShowStatus ] = useState("none")

    const openForm = ()=>{
        setShowStatus("flex")
    }

    const closeForm = ()=>{
        setShowStatus("none")
    }
    const saveVideo= ()=>{
        console.log(title.current.value, url.current.value)
    }
    return (
        <div className="form">
            <button onClick={openForm}> Add New Video </button>
       
            <div style={{display:showStatus}}>
                <h3>ADD YOUR VIDEO</h3> 
                <input type="text" ref={title} placeholder="Enter Your Video Title"/>
                <input type="text" ref={url} placeholder="Enter Your YouTube Link"/>
              
                <div className="action">
                    <button  className="cancle" onClick={closeForm}> Cancle</button>
                    <button className="save" onClick={saveVideo} > Save </button>
                </div>
            </div>


         </div>

    )
}



 export default Add