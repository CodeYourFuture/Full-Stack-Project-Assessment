import React, { useState } from "react";
import "./App.css";
import data from "./data";
// import Header from "./components/Header";
// import Main from "./components/Main";
import smileyFace from "./smiley-face.png";
import downVoteFace from "./downvote-face.png";

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Main />
//     </div>
//   );
// }

const App = () => {
  const [list, setList] = React.useState(data);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
    <div>
      {/* <Header />
      <Main /> */}
      <List list={list} onRemove={handleRemove} />;
    </div>
  );
};

const List = ({ list, onRemove }) => (
  <div>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </div>
);

function Item({ item, onRemove }) {
  const [count, setCount] = useState(item.rating);

  function add() {
    setCount((prevCount) => prevCount + 1);
  }

  function subtract() {
    setCount((prevCount) => prevCount - 1);
  }
  return (
    <div>
      <span>{item.title}</span>
      <div>
        <div className="video">
          <hr />
          <h2>{item.title}</h2>
          <div className="votes">
            <div className="vote">
              <img src={smileyFace} alt="up vote" id="smiley-face" />
              <button id="upvote" onClick={add}>
                up vote
              </button>
            </div>

            <p className="rating">{count}</p>
            <div className="vote">
              <img src={downVoteFace} alt="down vote" id="down-vote-face" />
              <button id="downvote" onClick={subtract}>
                down vote
              </button>
            </div>
          </div>
          <iframe
            width="560"
            height="315"
            // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            src={"https://www.youtube.com/embed/" + item.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button type="button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default App;
