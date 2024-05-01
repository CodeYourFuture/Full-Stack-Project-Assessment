import { React, useState, useEffect } from "react";

function NewVideoForm() {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Enter Videos Title:</label>
				<input
					type="text"
					value={titleFromInput}
					onChange={(e) => handleInputTitle(e)}
				></input>
				<label>Enter Video's URL:</label>
				<input
					type="text"
					value={srcFromInput}
					onChange={(e) => handleInputUrl(e)}
				></input>
				<button type="submit">Add it!</button>
			</form>
		</>
	);
}

export default NewVideoForm;
