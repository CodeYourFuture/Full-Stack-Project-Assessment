import React, { useState } from "react";
import "./App.css";
import data from "./data";
import Header from "./components/Header";
// import Main from "./components/Main";
import Search from "./components/Search";
import AddVideo from "./components/AddVideo";
import Form from "./components/Form";
import List from "./components/List";

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
      {/* <Main /> */}
      <Search />
      <AddVideo />
      <Form />
      <List list={list} onRemove={handleRemove} />;
    </div>
  );
};

export default App;
