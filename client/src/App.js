import "./App.css";
import React, {useState} from "react";
import Header from './components/Header';
import Search from './components/Search';
import Videos from './components/Videos';
import data from "./exampleresponse.json";
import AddVideo from "./components/AddVideo";

const allData = data;

function App() {

  const [data , setData]= useState(allData)

  console.log(data,'<<<<<<<<<<<<<<<<')
  
  return (
    <div className="App">
      <Header/>
      <div className="inputData">
        <AddVideo data={data} setData={setData} />
        <Search/>
        <Videos data={data} setData={setData} /> 
      </div>
    </div>
  );
}
export default App;