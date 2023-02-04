import React, {useState, useEffect} from "react";
import "./App.css";
import Video from "./Video";
import VideoAdd from "./VideoAdd";

function App() {
const [videos, setvideos] = useState([]);
const [sortAscending, setsortAscending] = useState(false);

useEffect(() => {
fetch("https://videos-server-8o8d.onrender.com/video")
.then(res => res.json())
.then(data => setvideos(data))
.catch(err => console.log(err));
}, [videos]);

const handleSort = () => {
setsortAscending(!sortAscending);
};

return (
<div className="App">
<header className="App-header">
<h1>YouVideos.</h1>

<VideoAdd setvideos={setvideos} videos={videos} />
<button className="ascendbutton" onClick={handleSort}>
Ratings {sortAscending ? "Ascending" : "Descending"} 
</button>

</header>
<body>

{videos
.sort((a, b) => (sortAscending ? a.rating - b.rating : b.rating - a.rating))
.map((video, key) => (
<Video video={video} key={key} setvideos={setvideos} videos={videos} />
))}
</body>
</div>
);
}

export default App;
