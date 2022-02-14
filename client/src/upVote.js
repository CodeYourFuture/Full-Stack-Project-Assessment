// import React, { useState } from 'react';
// import Ratings from './ratings';


// const UpVote = (props) =>{
//     const [upVote, setUpVote] = useState(0);
//     //const [selected, setSelected] = useState(false);
    
//     const handleUpVote = () => {
//           setUpVote(upVote + 1);    
//     }
    
//     return (
//       <div>
//         <button
//           id={props.video.id}
//           className="upBtn"
//           onClick={() => handleUpVote()}
//         >
//           {upVote}
//         </button>
//         <Ratings video={props.video} upVote={upVote} />
//       </div>
//     );
// }

// export default UpVote;