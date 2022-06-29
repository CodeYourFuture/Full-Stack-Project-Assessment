import React from "react"
import { useState} from "react";
import RenderVideo from "./RenderVideo";




const Search = (props) => {
    

    const [searchTerm, setSearchTerm] = useState("");


   

    function handelSearchTerm(event) {
        const  typedValue = (event.target.value);
        setSearchTerm(typedValue);
        if(typedValue === ""){
            props.filterVideo(props.allData)
        }
        else{
           const filteredArray = props.allData.filter((video)=> video.title.toLowerCase().includes(typedValue.toLowerCase()));
            props.setFilterVideo(filteredArray)
        }
    };
    return (
        <>
            <div className="form-group row">
                <div className="col-sm-10">
                    
                    <input type="text"
                        value={searchTerm}
                        onChange={handelSearchTerm}
                        className=" col-sm-8 form-control"
                        id="searchBar"
                        placeholder="Search" />
                </div>

            </div>
            <RenderVideo
               filterVideo={props.filterVideo} 
               setFilterVideo={props.setFilterVideo} />
            <div>

            </div>
        </>
    );
}

export default Search;

//sfc tab