import React, { useState } from 'react'


export default function VideoCard({ item, setVideolist, videolist }) {
    const [like, setLike] = useState(item.rating)

    const handleDelete = () => {

        const filtered = videolist.filter(i => i.id !== item.id)
        setVideolist(filtered);
    }

    return (
        <div>
            <div className="card" style={{ width: "50%" }}>
                <div className="containerr">
                    <h3>{item.title}</h3>
                    <div className="section">
                        <button className="sec-button" onClick={() => setLike(like + 1)}>Like</button>
                        <button className="sec--button" onClick={() => setLike(like - 1)}>Dislike
                        </button>
                    </div>

                    <iframe id="Frame"
                        title="title-Frame"
                        height="200"
                        style={{ border: '0px', width: '100%' }}
                        src={`https://www.youtube.com/embed/${item.url.split('=')[1]}`}>
                    </iframe>
                    <h5>{like}</h5>
                    <div className="section">
                        <button className="sec-button" onClick={handleDelete}>Delete</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
  

