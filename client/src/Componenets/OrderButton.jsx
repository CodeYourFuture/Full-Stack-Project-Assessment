import React, { useState } from 'react'

const OrderButton = ({ videos, setVideos }) => {
  const [order, setOrder] = useState([])
  const desc = [...videos].sort((a, b) => b.rating - a.rating)
  const asc = [...videos].sort((a, b) => a.rating - b.rating)

  const toggleOrder = () => {
    //   className === 'bi bi-sort-up' ? className = bi bi-sort-down-alt
    //desc ? bi bi-sort-up
    // console.log(videos.rating === desc.rating)
    // return videos.rating === desc.rating ? setVideos([...asc]) : setVideos([...desc])
  }

  return (
    <div className="order-buttons">
      <i className={'bi bi-sort-down-alt'} onClick={toggleOrder}></i>
    </div>
  )
}

export default OrderButton
