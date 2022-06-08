import React from "react";
import "./App.css";
import data from "./data";
import Header from "./components/Header";
import Main from "./components/Main";

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
      <Header />
      <Main />
      <List list={list} onRemove={handleRemove} />;
    </div>
  );
};

const List = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>{item.title}</span>
    <div>
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
  </li>
);

export default App;
