import React from 'react';

const vidSearch = ({inputValue, setInputValue}) => {


    return (
        <>
             <label>Search</label>
             <input type="text" value={inputValue} onChange={event => {
          setInputValue(event.target.value);
        }}></input>
        </>
    )
}

export default vidSearch