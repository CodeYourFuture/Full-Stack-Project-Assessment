import React, { useState } from "react";

function VideosForm(onAddVideo) {

    const [text, setText] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddVideo(text);
      setText("");
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
        name ="title"
          type="text"
          placeholder="Enter Video Title"
          id="text"
          value={text.title}
          onChange={(e) => setText(e.target.value)}
        />

<input
name ="url"
          type="text"
          placeholder="Enter Video Link"
          id="text"
          value={text.url}
          onChange={(e) => setText(e.target.value)}
        />

        <input
        name ="rating"
          type="text"
          placeholder="Enter Ratings"
          id="text"
          value={text.rating}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Add Video</button>
      </form>
    );
  }


//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>Add Video</h1>
//       </div>
//       <div className="form">
//         <input onChange={handleChange} type="text" value={inputText} />
//         <button onClick={addItem}>
//           <span>Add</span>
//         </button>
//       </div>
//       <div>
  
//       {items.map(todoItem => (
// <iframe 
//   src={todoItem} 
// title="YouTube video player" 
// frameborder="0" 
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
// allowfullscreen
// width="560" height="315">
// </iframe>
// ))}      
//       </div>
//     </div>
//   );
// }

export default VideosForm;






