import React,{useState, useEffect}  from 'react';
import Modal from "react-modal";



const AddVideo =({showAddVideoModal,setShowAddVideoModal})=>{
   const [formBooking, setFormBooking] = useState({});
  const handleInputValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormBooking({ ...formBooking, [name]: value });
    console.log(formBooking);
  };

  const submitAddBooking = async (e) => {
    e.preventDefault();
    const url = "https://mahri-hotel-server.glitch.me/bookings";
    const postDetails = {
      method: "POST",
      body: JSON.stringify(formBooking),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(url, postDetails);
      if (response.ok) {
        let jsonResponse = await response.json();
        console.log(jsonResponse);
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };
   
  const customStyles = {
   overlay: {
     zIndex: "999",
     position: "fixed",
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     opacity: 0.95,
     background: "#171717",
     
   },
   content: {
     top: "50%",
     left: "50%",
     right: "auto",
     bottom: "auto",
     marginRight: "-50%",
     transform: "translate(-50%, -50%)",
     border: "none",
     width:'460px',
     padding:'1rem',
     margin_left: '1rem'
   }
 };

return(
       <Modal
       isOpen={showAddVideoModal}
        onRequestClose={() => setShowAddVideoModal(false)}
        style={customStyles}
      >
         <form>
          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              onChange={handleInputValue}
              type="text"
              name="title"
              className="form-control"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label for="video_id" className="form-label">
            Video_id
            </label>
            <input
              required
              onChange={handleInputValue}
              type="text"
              name="video_id"
              className="form-control"
              id="video_id"
            />
          </div>
          <div className="mb-3">
            <label for="categories" className="form-label">
              Categories
            </label>
            <input
              required
              onChange={handleInputValue}
              type="categories"
              name="categories"
              className="form-control"
              id="categories"
            />
          </div>

          <div className="mb-3">
            <label for="favorites" className="form-label">
              Favorites
            </label>
            <input
              onChange={handleInputValue}
              type="number"
              name="favorites"
              className="form-control"
              id="favorites"
            />
          </div>
          <div className="mb-3">
            <label for="votes" className="form-label">
              Votes
            </label>
            <input
              onChange={handleInputValue}
              type="text"
              placeholder=""
              name="votes"
              className="form-control"
              id="votes"
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitAddBooking}
          >
            Submit
          </button>
        </form>
      </Modal>
)
}


export default AddVideo;