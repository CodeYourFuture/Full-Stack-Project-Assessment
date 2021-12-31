import React, { Component , useState , useEvent , useEffect } from "react";
import AddVideo from "./AddVideo";
import SearchVideo from "./SearchVideo";



const styles = {
    transition : 'all 500ms ease-in-out'
}

export class ApprovalCounterFunction extends React.Component {

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
            <h3>NUMBERS</h3>
        </div>

        )
    }
}

export default ApprovalCounterFunction

