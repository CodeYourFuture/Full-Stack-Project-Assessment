import React from 'react';

const OrderButton = ({ videos, setVideos, order, setOrder }) => {
  const handleChange = (e)=> {
    e.preventDefault();
    setOrder(e.target.value);
  }
    return (
         <div>
            <form>
                <input type='submit' value="asc" onClick={handleChange}/>
                <input type='submit' value="desc" onClick={handleChange}/>
            </form>
           </div>
  )
};

export default OrderButton