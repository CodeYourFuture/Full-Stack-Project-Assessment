const AddVideo = (props) => {
    return(
        <div onClick = {props.handleAddVideo} className = "addvideo">
            <h3>Add Video</h3>
            <div className = "displayclass">
                <div className = "titleUrl">
                    Title <input></input>
                    URL <input></input>
                </div>
                <div className = "addNdel">
                    <button>Cancel</button>
                    <button>ADD</button>
                </div>
            </div>
       </div>
    )
}
export default AddVideo;