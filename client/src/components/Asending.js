import React from 'react'
import Aackage from "../data/exampleresponse.json";

function Asending( ) {
  //const [asending, setAsending] = useState([]);
  
  function DiscendingOrder(){
    const newPackage =   Aackage.sort( (a, b)=>
           a.title > b.title ? 1: -1
      );
      console.log(newPackage);
    return newPackage;
  }
  function AscendingOrder( ){
    const newPackage =  Aackage.sort( (a, b)=>
           a.rating < b.rating ? 1: -1
      );
      console.log(newPackage);
    return newPackage;
  }
   return (
    <div className="Asending">
      <h3>Ascending - Discending</h3>
      <button onClick={AscendingOrder} className="btn btn-primary">Asending</button>
      <button  onClick={DiscendingOrder} className="btn btn-primary">Disending</button>

    </div>)
  } 

export default Asending;
