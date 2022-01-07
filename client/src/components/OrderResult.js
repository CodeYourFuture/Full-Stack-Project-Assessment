import React from "react";
import Package from "../data/exampleresponse.json";

const OrderResult = () =>{
   
 function   Ascending()
   {
    const sorted = Package.sort(function(a, b){
      return   a.rating - b.rating;
    });
   console.log(sorted);
   return sorted;
   }  
return (<div class="the-button">
   <button onClick={Ascending}>Ascending order</button>
<button onClick={Ascending}>Descending order</button>
</div>
)
}
         
     export default OrderResult;