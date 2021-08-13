import { useState } from "react";
import Video from "./Video";

const Ratings = ({ data, setData, VideoId }) => {
	console.log(`You are here sir!`);
	console.log(`Data in ratings ${data[0].id}`);
	console.log(`ratings in Ratings ${Ratings}`);
	const [rating, setRating] = useState(0);
	//maybe use filter to extract one video by id,
	//and then setRating() and pass to onClick function

	return (
		<div>
			<button onClick={() => setRating(rating + 1)}>Like</button>
			<button onClick={() => setRating(rating - 1)}>Unlike</button>
			<Video
				Rating={rating}
				SetRating={setRating}
				// FilteredData={filteredData}
			/>
		</div>
	);
};

export default Ratings;
