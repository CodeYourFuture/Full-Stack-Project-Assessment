import { useState } from "react";

const Ratings = ({ defaultRating }) => {
	const [rating, setRating] = useState(defaultRating);
	//maybe use filter to extract one video by id,
	//and then setRating() and pass to onClick function

	return (
		<div>
			<button onClick={() => setRating(rating + 1)}>Like</button>
			<h4>Dynamic Rating:{rating}</h4>
			<button onClick={() => setRating(rating - 1)}>Unlike</button>
		</div>
	);
};

export default Ratings;
