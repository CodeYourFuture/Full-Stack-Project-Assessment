export function Video({ name, src }) {
	const [_, youtubeId] = src.split("?v=");
	return (
		<>
			<h2>{name}</h2>
			<iframe
				title="Inline Frame Example"
				width="300"
				height="200"
				src={`https://www.youtube.com/embed/${youtubeId}`}
			></iframe>
		</>
	);
}
