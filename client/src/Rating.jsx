import React, { useState } from 'react';
import exampleresponse from "./exampleresponse.json";

const Rating = props => {
  const [rate,setRate] =useState(props.rating)
    return <>
    <div>
            <button
              onClick={e=>{
                  setRate(rate+1);
                  exampleresponse.filter((I)=>I.id === props.ratingId).id =+1
                  props.rating = rate;
            }
              }
            >
              up
            </button>
            <p>{rate}</p>
            <button
              onClick={(e) =>
                {
                  setRate(rate - 1);
                  exampleresponse[props.rating] = rate;
                }
                
              }
            >
              down
            </button>
            </div>
            </>;
}
 
export default Rating;