import "./App.css";
import Search from "./components/Search";
import Add from "./components/Add";
import data from "./exampleresponse.json";
import Singlevideo from "./components/SingleVideo";
import { useState } from "react";

function App() {
  const [list,setList]=useState(data)
  const handleRemove=(Id)=>{
    const newList= list.filter(movie=>movie.id !== Id)
    setList(newList)
  }
    return (
    <main>
      <header>
        <div className="title">
          <h2> VIDEO LIST</h2>
        </div>
        <div className="search">
          <Search />
        </div>
      </header>
      <section className="content">
        <div className="add">
          <Add />
        </div>
        <div className="video">
          {list.map((video) => {
            return <Singlevideo key={video.id} {...video} handleRemove={handleRemove}/>;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
