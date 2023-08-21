import React from 'react'

function Button({ deleteHandler }) {
  return (
    <button onClick={deleteHandler}>Delete</button>
  )
}

export default Button