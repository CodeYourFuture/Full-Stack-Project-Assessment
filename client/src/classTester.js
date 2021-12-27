import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";
import button from './button-bg.png';

const styles = {
    transition : 'all 1000ms ease-in-out'
}

export class Tester extends React.Component {

    constructor(){
        super();
        this.state = {
            isOpen : false,
            visibility: 'hidden',
            opacity:0,
            width: '100%',
            zIndex: 10
        };
    }

    onScale(){
        if (this.state.isOpen === false){
            console.log("Popout opening")
            this.setState({
                isOpen : true,
                visibility: 'visible',
                opacity:1,
                width: '300%',
                zIndex: 1000
            });
        } else if (this.state.isOpen === true) {
            console.log("Popout closing")
            this.setState({
                isOpen : false,
                visibility: 'hidden',
                opacity:0,
                width: '100%',
                zIndex: 10
            });
        }

    }

    // onHide(){
    //     console.log("ONSCALE ACTIVATE")
    //     this.setState({
    //         opacity:0,
    //         width: '100%'
    //     });
    // }

    render(){
        return (
        <div>
            <h2 className="headerBoxText" style={{zIndex : this.state.zIndex}} onClick={this.onScale.bind(this)}>SEARCH</h2>
            <img src={button} alt="button background" id="boxAImage" onClick={this.onScale.bind(this)}></img>
            <div id="testerAnim" style={{...styles ,visibility:this.state.visibility ,opacity:this.state.opacity, width:this.state.width}}>
                <SearchVideo/>
            </div>   

        </div>

        )
    }
}

export default Tester