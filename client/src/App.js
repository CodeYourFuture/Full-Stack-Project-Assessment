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
  const [list, setList] = useState(data);

  const [filteredList, setFilteredList] = useState(data);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  function handleSearch(searchTerm) {
    const newList = list.filter((item) => item.title.includes(searchTerm));
    console.log("setting filtered list", newList);
    console.log(`search term is ${searchTerm}`);
    setFilteredList(newList);
  }

  return (
    <div>
      <Header />
      {/* <Main /> */}
      <Search handleSearch={handleSearch} />
      <AddVideo />
      <Form />
      <List list={filteredList} onRemove={handleRemove} />;
    </div>
  );
};

export default App;
