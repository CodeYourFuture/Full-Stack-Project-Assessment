import React from 'react';

const OrderButton = ({ videos, setVideos, order, setOrder }) => {
  const handleChange = (e)=> {
    e.preventDefault();
    setOrder(e.target.value);
  }
    return (
         <div>
            <form onSubmit={handleChange}>
                <input type='submit' value="asc" />
                <input type='submit' value="desc" />
            </form>
           </div>
  )
};

export default OrderButton;