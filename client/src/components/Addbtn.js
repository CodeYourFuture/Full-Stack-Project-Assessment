import React, { useState } from "react";

function Addbtn() {
    return (
        <div className="addbtn-wrapper">
            <h3>Add Video</h3>
            <form>
                <label>Title</label>
                <input></input>
                <br/>
                <label>Url</label>
                <input></input>
            </form>
            <button>Add</button>
        </div>
    )

    //example code from previous work
//     const [reminder, setReminder] = useState("");
//     const [items, setItems] = useState([]);

//   function handleChange(event) {
//     setReminder(event.target.value);
//   }

//   return (
//       <div>
//     <form>
//       <input
//         type="text"
//         placeholder="Some reminder"
//         value={reminder}
//         onChange={(event)=> setReminder(event.target.value)}
//       />
//     </form>
//       <p>Today I need to remember to... {reminder}</p>
//     {/* <button onClick={(event)=> setReminder(event.target.value)}>Add</button> */}
//           <ul>
//               {items.map(item => (
//                   <li key={item.id}>{item.name}</li>
//               ))}
//           </ul>
//       </div>
//   );
}

// 2nd try

// function Addbtn() {
//     const [items, setItems] = useState([]);
//     const [itemName, setItemName] = useState("");

//     const add = event => {
//         event.preventDefault();
//         setItems([
//             ...items,
//             {
//                 id: items.length,
//                 name: itemName
//             }
//         ]);
//         setItemName("");
//     };

//     return (
//       <>
//         <form>
//           <label>ADD</label>
//           <input
//             name="item"
//             type="text"
//             value={itemName}
//             onChange={e => setItemName(e.target.value)}
//           />
//         </form>
//         <button onClick={add}>Add Video</button>
//         <ul>
//           {items.map(item => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       </>
//     );
// }

//3rd try

// function Addbtn(props) {
//     const [title, setTitle] = useState("");
//     const [url, setUrl] = useState("");




//     return (
//         <div className="add-video">
//             <p>Add Video</p>
//             <form action="" method="submit">
//                 <label for="title" name="title">
//                     Title
//           </label>
//                 <input
//                     id="title"
//                     type="text"
//                     onChange={(e) => setTitle(e.target.value)}
//                     value={title}
//                 ></input>
//                 <label for="url" name="url">
//                     URL
//           </label>
//                 <input
//                     id="url"
//                     type="text"
//                     onChange={(e) => setUrl(e.target.value)}
//                     value={url}
//                 ></input>
//                 <button id="add-video" type="button" onClick={() => props.addNewVideo(title, url)}>
//                     {" "}
//                     Add Video
//           </button>
//             </form>
//         </div>
//     );
// }


  
export default Addbtn;