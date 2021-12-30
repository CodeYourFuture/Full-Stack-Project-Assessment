import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";



const styles = {
    transition : 'all 500ms ease-in-out'
}



export class AddVideoTornAnimation extends React.Component {

    constructor(){
        super();
        // console.log(this.props)
        // this.props.passBackParam(data) 
        // this.testPassback = this.testPassback.bind(this);

        this.state = {
            isOpen : false,
            visibility: 'hidden',
            textVisibility: 'visible',
            display: 'none',
            textDisplay: 'inline',
            opacity:0,
            width: '100%',
            zIndex: 10,
            background: '',
            fakeWidth: '5vw'
        };
    }


    passDataToParent(data){
        console.log(data)
        this.props.passBackParam(data)
        return(data)
    }

    

    onScale(){
        if (this.state.isOpen === false){
            console.log("Popout opening")
            this.setState({
                isOpen : true,
                visibility: 'visible',
                textVisibility: 'hidden',
                display: 'inline',
                textDisplay: 'none',
                opacity:1,
                width: '80vw',
                zIndex: 1000,
                background:'linear-gradient(to left top, transparent 47.75%, red 49.5%, red 50.5%, transparent 52.25%)',
                fakeWidth: '25vw'
            
            });
        } else if (this.state.isOpen === true) {
            console.log("Popout closing")
            this.setState({
                isOpen : false,
                visibility: 'hidden',
                textVisibility: 'visible',
                display: 'none',
                textDisplay: 'inline',
                opacity:0,
                width: '100%',
                zIndex: 10,
                background: '',
                fakeWidth: '5vw'
            });
        }

    }

    render(){
        return (
        <div className="addVideo_outer_container">

            <div id="torn_edge_banner" class="torn_container torn_left torn_right">
	            <div></div>
                {/* Target below  with width change */}
	            <div className="addVideo_banner_span_container"  style={{...styles , zIndex : this.state.zIndex}}>
                    <span className="addVideo_banner_hidden" style={{display:this.state.display}}>
                        <AddVideo passBackParam={(data)=>{
                            this.passDataToParent(data)
                            }}/>
                    </span>
                    {/* <h3>HCRAES</h3> */}
                    <span class="addVideo_banner_text" onClick={this.onScale.bind(this)} style={{background:this.state.background, display: this.state.textDisplay}}>ADD VIDEO</span>
                </div>

                <div className="addVideo_fake_banner_left_container" >
                    <div id="torn_edge_banner" class="torn_container torn_left torn_right">
	                    <div></div>
	                    <div style={{...styles , width:this.state.fakeWidth, visibility:this.state.visibility}}>
                            <span class="fake_banner_text" onClick={this.onScale.bind(this)} style={{background:this.state.background}}>ADD</span></div>
                    </div>
                </div>
                <div className="addVideo_fake_banner_right_container" >
                    <div id="torn_edge_banner" class="torn_container torn_left torn_right">
	                    <div></div>
	                    <div style={{...styles , width:this.state.fakeWidth, visibility:this.state.visibility}}>
                            <span class="fake_banner_text" onClick={this.onScale.bind(this)} style={{background:this.state.background}}>VIDEO</span></div>
                    </div>
                </div>

            </div>


        </div>

        )
    }
}


export default AddVideoTornAnimation



