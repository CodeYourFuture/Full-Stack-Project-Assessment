import React from 'react'

const VideoCard = ({ data }) => {
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4 my-3">
            {data.map((video, index) => (
                <div key={index} className="col">
                    <div className="card mb-3">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VideoCard
