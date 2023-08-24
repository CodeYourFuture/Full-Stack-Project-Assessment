import React from 'react'

function Button({ onDelete, id }) {
  return <button onClick={() => onDelete(id)}>Delete ❌</button>;
}

export default Button;