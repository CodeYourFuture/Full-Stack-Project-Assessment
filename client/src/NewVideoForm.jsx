import React from "react";

function NewVideoForm() {
	return (
		<>
			<form>
				<label>Enter Videos Title:</label>
				<input type="text"></input>
				<label>Enter Video's URL:</label>
				<input type="text"></input>
				<button type="submit">Add it!</button>
			</form>
		</>
	);
}

export default NewVideoForm;
