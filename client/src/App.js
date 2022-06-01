import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

// function Video() {
//   const videoIdArray = [
//     "dQw4w9WgXcQ",
//     "HerCR8bw_GE",
//     "FUeyrEN14Rk",
//     "xbs7FT7dXYc",
//     "4As0e4de-r",
//     "gB1F9G0JXOo",
//     "RzWB5jL5RX0",
//     "U4ogK0MIzqk",
//     "X-iSQQgOd1A",
//     "ZacOS8NBK6U",
//   ];

//   const videoData = data.map((item) => {
//     const videoIdMap = videoIdArray.map((id) => {
//       console.log(id);
//       return id;
//     });
//     return (
//       <div className="videos-container">
//         <div className="video-container">
//           <h2>{item.title}</h2>
//           {/* <iframe
//             width="560"
//             height="315"
//             src="https://www.youtube.com/embed/hKRUPYrAQoE"
//             title="YouTube video player"
//             frameborder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowfullscreen
//           ></iframe> */}

//           <video src={item.url} alt={""} />
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
      <Main />
    </div>
  );
}

export default App;
