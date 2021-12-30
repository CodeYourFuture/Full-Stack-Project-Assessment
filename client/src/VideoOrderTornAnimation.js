import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";



const styles = {
    transition : 'all 500ms ease-in-out'
}

function handleOrderChange(){
    console.log("handleOrderChange has been run")
}

export class VideoOrderTornAnimation extends React.Component {

    constructor(){
        super();
        this.state = {
            isOpen : false,
            visibility: 'hidden',
            display: 'none',
            opacity:0,
            width: '100%',
            zIndex: 10,
            background: '',
            selectedOrder: 'desc'
        };
    }


    onScale(){
        if (this.state.isOpen === false){
            console.log("Popout opening")
            this.setState({
                isOpen : true,
                visibility: 'visible',
                display: 'inline',
                opacity:1,
                width: '80vw',
                zIndex: 1000,
                background:'linear-gradient(to left top, transparent 47.75%, red 49.5%, red 50.5%, transparent 52.25%)'
            });
        } else if (this.state.isOpen === true) {
            console.log("Popout closing")
            this.setState({
                isOpen : false,
                visibility: 'hidden',
                display: 'none',
                opacity:0,
                width: '100%',
                zIndex: 10,
                background: ''
            });
        }

    }

    
    passDataToParent(event){
        console.log("passDataToParent run")
        console.log(event.target.value)
        this.props.passBackParam(event.target.value)
        // return(data)
    }

    render(){
        return (
        <div className="videoOrder_outer_container">
            <div id="torn_edge_banner" class="torn_container torn_left torn_right">
	            <div></div>
                {/* Target below  with width change */}
	            <div className="videoOrder_banner_span_container"  style={{...styles , width:this.state.width, zIndex : this.state.zIndex}}>
                    <span className="videoOrder_banner_hidden" style={{display:this.state.display}}>
                        <select name="ratings" id="ratings" value={this.selectedOrder} onChange={this.passDataToParent.bind(this)}>
                            <label for="ratings">Video Order</label>
                            <option value="desc">Ascending</option>
                            <option value="asc">Descending</option>
                        </select>
                    </span>
                    {/* <h3>HCRAES</h3> */}
                    <span class="videoOrder_banner_text" onClick={this.onScale.bind(this)} style={{background:this.state.background}}>VIDEO ORDER</span>
                </div>
                
            </div>


        </div>

        )
    }
}

export default VideoOrderTornAnimation


