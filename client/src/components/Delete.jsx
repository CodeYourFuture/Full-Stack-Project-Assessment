// import { useState } from "react";
// import data from "../exampleresponse.json"

// function Delete () {
//   // primitives array
//   const [names, setNames] = useState([data]);
//   const removePrimitiveFromArray = () => {
//     //  remove 'Bob' from array
//     setNames((current) =>
//       current.filter((element) => {
//         return element !== "id";
//       })
//     );
//   };
//   return (
//     <div>
//       <button onClick={removePrimitiveFromArray}>
//         Remove
//       </button>
//       {names.map((element, index) => {
//         return <h2 key={index}>{element}</h2>;
//       })}
//       <hr />
//       <br />
//       </div>
//   );
//     }

//     export default Delete;