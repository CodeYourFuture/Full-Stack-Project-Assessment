import "./App.css";
import { useState } from "react";
import exampleresponse from '../src/data/exampleresponse.json'
import Card from './components/Card'
import Form  from './components/Form'


function App() {
  const[form,setForm]=useState(false)
  const [videolist,setVideolist]=useState(exampleresponse)
  
  return (
    <div className="container">
      <button onClick={()=>setForm(!form)}>Add Video</button>
      <Form form={form} videolist={videolist} setVideolist={setVideolist} />
      <div className="row">
        
   {videolist.sort((a,b)=>b.rating-a.rating).map((item)=> {return <div className="col-6 col-md-4">
    <Card key={item.id} item={item} setVideolist={setVideolist} videolist={videolist}/></div>

   
   })}
   </div>
    </div>
  );
}

export default App;
