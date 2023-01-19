import React from 'react'

function Deletebutton(props) {
    const handleDelete=(id)=>{
        ((props.data).filter((del)=>
            del.id !==id
        ))
    }
  return (
    <div>
        <button onClick={handleDelete(props.id)}>
            delete
        </button>
    </div>
  )
}

export default Deletebutton