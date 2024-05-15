import React, { useEffect, useState } from "react";

const App = () => {
	//     const videoRecommendations = [
	//         {
	//             title: 'Never Gonna Give You Up',
	//             url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	//         },
	//         {
	//             title: 'The Coding Train',
	//             url: 'https://www.youtube.com/user/shiffman',
	//         },
	//         {
	//             title: 'Mac & Cheese | Basics with Babish',
	//             url: 'https://youtu.be/FUeyrEN14Rk?si=UmIISITXWdBW2IY7',
	//         },
	//         {
	//             title: 'Videos for Cats to Watch - 8 Hour Bird Bonanza',
	//             url: 'https://youtu.be/xbs7FT7dXYc?si=j4zmi_NG69fKWO8O',
	//         },
	//         {
	//             title: 'The Complete London 2012 Opening Ceremony | London 2012 Olympic Games',
	//             url: 'https://www.youtube.com/live/4As0e4de-rI?si=B5vtQi29ckN7PK95',
	//         },
	//         {
	//             title: 'Learn Unity - Beginner\'s Game Development Course',
	//             url: 'https://youtu.be/gB1F9G0JXOo?si=xfnEQ1_3lIjvxx6c',
	//         },
	//         {
	//             title: 'Cracking Enigma in 2021 - Computerphile',
	//             url: 'https://www.youtube.com/watch?v=G2_Q9FoD-oQ',
	//         },
	//         {
	//             title: 'Coding Adventure: Chess AI',
	//             url: 'https://www.youtube.com/watch?v=U4ogK0MIzqk',
	//         },
	//         {
	//             title: 'Coding Adventure: Ant and Slime Simulations',
	//             url: 'https://www.youtube.com/watch?v=X-iSQQgOd1A',
	//         },
	//         {
	//             title: 'Why the Tour de France is so brutal',
	//             url: 'https://youtu.be/ZacOS8NBK6U?si=5zoBp8L-FN9-0FBt',
	//         },
	//     ];

	const [videos, setVideos] = useState([]);

	async function getFetch() {
		fetch("https://full-stack-project-group2.netlify.app/api/videos")
			.then((res) => res.json())
			.then((data) => setVideos(data));
	}

	useEffect(() => {
		getFetch();
	}, []);

	return (
		<>
			<h1>Video Recommendations</h1>
			<ul>
				{videos.map((video) => {
					return (
						<>
							<li key={video.id}>
								<a href={video.src}>{video.title}</a>
							</li>
						</>
					);
				})}
				{/* {videoRecommendations.map((recommendation, index) => (
                    <li key={index}>
                        <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
                            {recommendation.title}
                        </a>
                    </li>
                ))} */}
			</ul>
		</>
	);
};

export default App;
