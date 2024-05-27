import React from "react";

function SortVideos({ onSortChange }) {
	const handleChange = (event) => {
		onSortChange(event.target.value);
	};

	return (
		<select name="order" onChange={handleChange}>
			<option value="">Default</option>
			<option value="asc">Ascending</option>
			<option value="desc">Descending</option>
		</select>
	);
}

export default SortVideos;
