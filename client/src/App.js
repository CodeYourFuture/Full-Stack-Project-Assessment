
import { useState ,useEffect} from "react";
// import exampleresponse from '../src/data/exampleresponse.json'
import Card from './components/Card'
import Form  from './components/Form'


function App() {

  const[form,setForm]=useState(false)
  const [videolist,setVideolist]=useState([])

useEffect(() => {
  async function getVideos() {
    const res = await fetch("http://localhost:5000/videos");
    const data = await res.json();
    setVideolist(data);
  }
  getVideos();
}, []);

  return (
    <div className="container" >
      <h1><i class="fa-thin fa-poo"></i></h1>
      <div className="title">
      <button onClick={()=>setForm(!form)} style={{margin:'40px auto'}}>Add Video</button>
      <Form form={form} videolist={videolist} setVideolist={setVideolist} />
      </div>
      <div className="row" >
        
   { videolist && videolist.sort((a,b)=>b.rating-a.rating).map((item)=> {return <div className="col-6 col-md-4" >
    <Card key={item.id} item={item} setVideolist={setVideolist} videolist={videolist}/></div>

   
   })}
   </div>
    </div>
  );
}

export default App;
