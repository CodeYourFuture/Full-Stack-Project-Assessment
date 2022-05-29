import "./App.css";
import exampleresponse from "./exampleresponse.json";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";

// function Video() {
//   // const videoIdArray = [
//   //   "dQw4w9WgXcQ",
//   //   "HerCR8bw_GE",
//   //   "FUeyrEN14Rk",
//   //   "xbs7FT7dXYc",
//   //   "4As0e4de-r",
//   //   "gB1F9G0JXOo",
//   //   "RzWB5jL5RX0",
//   //   "U4ogK0MIzqk",
//   //   "X-iSQQgOd1A",
//   //   "ZacOS8NBK6U",
//   // ];

//   // const videoIdMap = videoIdArray.map((id) => {
//   //   console.log(id);
//   //   return id;
//   // });
//   const videoData = exampleresponse.map((item) => {
//     return (
//       <div className="videos-container">
//         <div className="video-container">
//           <h2>{item.title}</h2>
//           <iframe
//             width="560"
//             height="315"
//             src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//           {/* <video src={item.url} alt={""} /> */}
//           <div className="votes">
//             <p>{item.rating}</p>
//             <p>up-vote icon</p>
//             <p>down-vote icon</p>
//           </div>
//           <button>button to remove video</button>
//         </div>
//       </div>
//     );
//   });
//   return <>{videoData}</>;
// }

function App() {
  return (
    <div className="App">
      <Header />

      <AddVideo />
      {/* <Video /> */}
    </div>
  );
}

export default App;
