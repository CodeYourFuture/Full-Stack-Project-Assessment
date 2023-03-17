import React,{useState, useRef, useEffect} from "react";
import "./App.css";
import Video from "./Video";
import AddBtn from "./AddBtn";
//import AddVideos from "./AddVideos";




function App() {
const [entry, setEntry] = useState('');
const [entryUrl, setEntryUrl] = useState('');
const [list, setList] = useState([]);
const countRef = useRef(null);


function fetchingData() {
  fetch('/api/values')
  .then(res => res.json())
  .then(data => setList(data))
}

useEffect(() =>{
  countRef.current.focus();
},[]);
 
useEffect(() =>{
 fetchingData();
}, []);



const submitted = (e) =>{
  e.preventDefault();
  if(!entry && !entryUrl){
   console.log('missing value')
  }else{
    console.log(entry, entryUrl);
    setEntry('');
    setEntryUrl(''); }
}

  const removeItem = (id) =>{
    const elementRemoved = list.filter(item => item.id !== id);
    setList(elementRemoved);
   };

  return (
    <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <form action="#" className='form'  onSubmit={submitted}> 
            <div className="form-control">
               <label htmlFor="title">Title: </label>
               <input type="text" id="title" name="title" ref={countRef} value={entry} onChange={(e) =>{setEntry(e.target.value)}}/>
               <label htmlFor="url">URL: </label>
               <input type="url" id="url" name="url" value={entryUrl} onChange={(e) =>{setEntryUrl(e.target.value)}}/>
               <AddBtn />
            </div>
        </form>
        <section className="row row-cols-lg-3 row-cols-sm-1 gx-2 pt-2"> 
          {list.map((video) => {
            return <Video video={video}  removeItem={removeItem} />  
          })}  
        </section>
    </div>
  );
}

export default App;
