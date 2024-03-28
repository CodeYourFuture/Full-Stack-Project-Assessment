export function Video({ name, src }) {
	return (
		<>
			<h2>{name}</h2>
			<iframe
				title="Inline Frame Example"
				width="300"
				height="200"
				src={src}
			></iframe>
		</>
	);
}
