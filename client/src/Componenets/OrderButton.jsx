import React, { useState } from 'react'

const OrderButton = ({ videos, setVideos }) => {
  const [upDown, setUpDown] = useState('bi bi-sort-down')
  
  const toggleOrder = () => {
    setVideos([...videos].reverse())
    setUpDown(!upDown)
  }

  return (
    <div className="order-buttons">
      <i
        className={upDown ? 'bi bi-sort-down' : 'bi bi-sort-up-alt'}
        onClick={toggleOrder}
      ></i>
    </div>
  )
}

export default OrderButton
