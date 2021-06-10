import React from 'react';
const DeleteVideo = (props) =>{
    const handleDelete = (event) => {        
        const videoTitle = event.currentTarget.parentNode.parentNode.childNodes[0].textContent;
        const videoToDelete = props.allVideos.filter((obj) => {
            if((obj["title"] === videoTitle)){
            return obj;
            }
        })
        fetch("http://127.0.0.1:5000/:ID", {
                        method: "DELETE",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(videoToDelete)
                    })
                    .then((response) => response.json())          
                              .then(data => {
                                props.setDisplayVideos(data);
                            })
                            .catch(error => console.error(error));      

        // props.allVideos.current = videosRemaining;
        props.setDisplayVideos(props.allVideos);
    }

    return <button onClick = {handleDelete} className="btn btn-danger" >DELETE</button>    
}
export default DeleteVideo;

// fetch("http://127.0.0.1:5000", {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(newVideoToAdd)
//         })
//           .then((response) => response.json())          
//           .then(data => {
//             props.setDisplayVideos(data);
//         })
//         .catch(error => console.error(error));

        