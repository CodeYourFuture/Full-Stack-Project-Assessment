const AddVideo = (props) => {    
    const handleAddVideo = (event) => {
        const videoToAdd = event.target.textContent;
        if(videoToAdd === "Add Video") {
            if (event.currentTarget.childNodes[1].classList.contains("displayclass")){
                event.currentTarget.childNodes[1].classList.remove("displayclass")
            } else {
                event.currentTarget.childNodes[1].classList.add("displayclass")
            }
        } else if ( videoToAdd === "Cancel") {
            event.currentTarget.childNodes[1].classList.add("displayclass")
        } else if (videoToAdd === "ADD") {
           const title = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1].value;
           event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[1].value = "";
           const url = event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[3].value;
           event.currentTarget.parentNode.childNodes[0].childNodes[1].childNodes[0].childNodes[3].value = ""
           const urlValidation = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]+)/;
           const newVideoToAdd = {
                 title,
                "rating": 0,
                 url                
        } 

        if (!(title.toString().trim().length === 0) && (url.match(urlValidation))){
        fetch("http://127.0.0.1:5000", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newVideoToAdd)
        })
          .then((response) => response.json())          
          .then(data => {
            props.setDisplayVideos(data);
        })
        .catch(error => console.error(error));
    } 
    else {
            alert("Enter a valid title or URL")
        }
    }    
    }

    return(
        <div onClick = {handleAddVideo} className = "addvideo">
            <h3>Add Video</h3>
            <div className = "displayclass">
                <div className = "titleUrl">
                    Title <input></input>
                    URL <input></input>
                </div>
                <div className = "addNdel">
                    <button className="btn btn-warning">Cancel</button>
                    <button className="btn btn-primary">ADD</button>
                </div>
            </div>
       </div>
    )
}
export default AddVideo;