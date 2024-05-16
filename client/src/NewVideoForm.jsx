const NewVideoForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("/api/videos", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: e.target.title.value,
				src: e.target.src.value,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<h2>Add New Video</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Video Title:</label>
					<input type="text" id="title" required />
				</div>
				<div>
					<label htmlFor="src">Video url:</label>
					<input type="url" id="src" required />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default NewVideoForm;
