const AddVideo = () => {
    return(
        <div className = "addvideo">
            <h3>Add Video</h3>
            Title <input></input>
            URL <input></input>
            <div className = "addNdel">
                <button className = "btn btn-danger">Cancel</button>
                <button className = "btn btn-warning">ADD</button>
            </div>
       </div>
    )
}
export default AddVideo;