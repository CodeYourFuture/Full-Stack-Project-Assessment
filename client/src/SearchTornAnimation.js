import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";



const styles = {
    transition : 'all 500ms ease-in-out'
}

export class SearchTornAnimation extends React.Component {

    constructor(){
        super();
        this.state = {
            isOpen : false,
            visibility: 'hidden',
            display: 'none',
            opacity:0,
            width: '100%',
            zIndex: 10,
            background: ''
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

    render(){
        return (
        <div>

            <div id="torn_edge_banner" class="torn_container torn_left torn_right">
	            <div></div>
                {/* Target below  with width change */}
	            <div className="search_banner_span_container"  style={{...styles , width:this.state.width, zIndex : this.state.zIndex}}>
                    <span class="search_banner_text" onClick={this.onScale.bind(this)} style={{background:this.state.background}}>SEARCH</span>
                    <span className="search_banner_hidden" style={{display:this.state.display}}>
                        <SearchVideo/>
                    </span>
                </div>
                
            </div>


        </div>

        )
    }
}

export default SearchTornAnimation



// return (
//         <div  onClick={this.onScale.bind(this)}>

//             <div id="torn_edge_banner" class="torn_container torn_left torn_right">
// 	            <div></div>
// 	            <div><span class="banner_text">Torn Edge Banner</span></div>
//             </div>


//             <h2 id="testerText" className="headerBoxText" style={{zIndex : this.state.zIndex}} onClick={this.onScale.bind(this)}>SEARCH</h2>
//             <img src={button} alt="button background" id="boxAImage" onClick={this.onScale.bind(this)}></img>
//             <div id="testerAnim" style={{...styles ,visibility:this.state.visibility ,opacity:this.state.opacity, width:this.state.width}}>
//                 <SearchVideo/>
//             </div>   

//         </div>

//         )