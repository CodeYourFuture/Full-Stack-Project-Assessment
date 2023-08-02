const AddingVideo = () => {
    return (

        <div className="form-holder">
            <h3>Add Your Favorite Video</h3>
            <form>
                <input type="text" defaultValue="" placeholder="Type in the title of the video you like"></input>
                <input tupe="url" defaultValue="" placeholder="Link for the video"></input>
                <button className="submit-form-button">Add to the List</button>
            </form>
        </div>
    )
}

export default AddingVideo