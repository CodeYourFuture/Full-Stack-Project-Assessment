import React from 'react'

function Button({ onDelete, id }) {
  return <button onClick={() => onDelete(id)} className="bg-gray-500 p-2 rounded">Delete ❌</button>;
}

export default Button;