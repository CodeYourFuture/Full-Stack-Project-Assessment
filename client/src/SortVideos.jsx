import React from "react";

function SortVideos({ onSortChange }) {
	const handleChange = (event) => {
		onSortChange(event.target.value);
	};

	return (
		<>
			<div id="drop-down-container">
				<label htmlFor="sort-videos">Sort Videos:</label>
				<select name="order" onChange={handleChange} id="sort-videos">
					<option value="" label="default">
						Default
					</option>
					<option value="asc" label="ascending">
						Ascending
					</option>
					<option value="desc" label="descending">
						Descending
					</option>
				</select>
			</div>
		</>
	);
}

export default SortVideos;
