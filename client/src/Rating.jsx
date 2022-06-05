import React, { useState } from 'react';
import app from "./"

const Rating = props => {
  const [rate,setRate] =useState(props.rating)
    return <>
    <div>
            <button
              onClick={e=>
                  setRate(rate+1)
              }
            >
              up
            </button>
            <p>{rate}</p>
            <button
              onClick={(e) =>
                
                  setRate(rate-1)
                
              }
            >
              down
            </button>
            </div>
            </>;
}
 
export default Rating;