import React from 'react'
import Aackage from "../data/exampleresponse.json";

function Asending() {
  //const [asending, setAsending] = useState([]);
  function AsendingOrder(){
    const newPackage =   Aackage.sort( (a, b)=>{
      if(a.title.toLowerCase() < b.title.toLowerCase()){

        return 1;
      }else{
        return null;
      }});
      console.log(newPackage);
    return newPackage;
  }
   return (
    <div className="Asending">
      <h3>Asending order</h3>
      <input id="id-input"></input>
      <button onClick={AsendingOrder} className="btn btn-primary">Asending</button>
      <button   className="btn btn-primary">Disending</button>

    </div>)
  } 

export default Asending;
