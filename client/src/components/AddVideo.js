const AddVideo = () => {

    return (
      <>
        <h2 className="addVideo">Add Video</h2>
            <form className="addvideo-form" method="post" action="submit">
                <div>
          <label className="addvideo" for="title" name="title">
                    Title:</label>
            <input type="text" name="title" required width='500px'/>
                   </div><div>
                        
            <label className="addvideo" for="url" name="url">  URL:</label>
                        <input type="text" name="url" required />
                        
           </div>
                        
          
        </form>{" "}
      </>
    );
 }








export default AddVideo;