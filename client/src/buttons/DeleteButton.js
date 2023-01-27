import React from 'react'

function DeleteButton({remove, id}) {
  return (
    <button  title="delBtn" onClick={() => remove(id)} className="delete-button">Delete</button>
  )
  }


export default DeleteButton;