import React, { useEffect, useState } from 'react'
import Addvideo from './Addvideo';
import Videocart from './Videocart'

function Main() {
const[videos,setVideos]=useState([])
const [filtered, setFiltered] = useState(videos);
useEffect(()=>{
    fetch('postgres://nagehan:ffg6HspieX5f17AMQkODvU99ETuVk8u3@dpg-cfck9j02i3mhen75eic0-a.frankfurt-postgres.render.com/videos_hhx6')
            .then(res => res.json())
            .then(data => {
                setVideos(data.sort((a, b) => b.rating - a.rating));
                setFiltered(data.sort((a, b) => b.rating - a.rating));

            })
    }, []);
console.log(videos)
const handleSearch = (e) => {
    if(e.target.value === ''){
        setFiltered(videos);
    }else{
        setFiltered(videos.filter((video) => video.title.toLowerCase().includes(e.target.value.toLowerCase())).sort((a, b) => b.rating - a.rating));
    }
}

    return (

    <div>
        <form>
            <input type='text' placeholder="search" onChange={handleSearch}/>

        </form>
        <div>
            <Addvideo/>
        </div>
        {filtered.map(video=>(
            <div>
                <Videocart video={video} data={setVideos} videos={videos}/>
              
                </div>
        ))}

    </div>
  )
}

export default Main