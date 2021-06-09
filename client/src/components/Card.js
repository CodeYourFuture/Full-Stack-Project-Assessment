import React from 'react';
import ReactPlayer from 'react-player';
import './Card.css';
import Likes from '../components/Likes';



const Card = (props) => {
    return (
        <div className="card">

            <h2 className="vid-title">{props.name}</h2>

            <ReactPlayer
                url={props.url}
                className="react-player"
                width='100%'
                height='400px'

            />
            <Likes clicked={() => props.clicked(props.id)} rating={props.rating} />





        </div>
    )
}

export default Card
