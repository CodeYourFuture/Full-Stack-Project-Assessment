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
          type="text"
          placeholder="Add Video"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Joke</button>
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






