import React from "react";
import ReactPlayer from "react-player";
import Votes from "./Votes";

const Card = ({id, title, url, rating, index, removeElement}) => {
	return (
		<div key={id} title={title} url={url} id={id} rating={rating} className='card'>
			<div className='video'>
				<ReactPlayer className='video' width={380} height={300} url={url} />
			</div>
			<div className='card-body'>
				<h4>{title}</h4>
				<p className='ratings'>YouTube ratings: {rating} </p>
				<Votes />
				<a href={url} rel='noopener noreferrer' className='btn btn-primary'>
					Watch Now
				</a>

				<button className='delete' onClick={() => removeElement(id, index)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Card;
