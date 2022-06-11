import React, { useState } from "react";
import "./App.css";
import data from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddVideoForm from "./components/AddVideoForm";
import Videos from "./components/Videos";
import Form from "./components/Form";
import List from "./components/List";

// function App() {
//   return (
//     <div>
//       <Header />
//       <SearchBar />
//       <AddVideoForm />
//       <Videos />
//     </div>
//   );
// }

const App = () => {
  const [list, setList] = useState(data);

  const [filteredList, setFilteredList] = useState(data);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
    console.log(newList);
    setList(newList);
    const newFilteredList = filteredList.filter((item) => item.id !== id);
    setFilteredList(newFilteredList);
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
      <SearchBar handleSearch={handleSearch} />
      <AddVideoForm />
      <Form />
      <List list={filteredList} onRemove={handleRemove} />;
    </div>
  );
};

export default App;
