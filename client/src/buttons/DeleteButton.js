import React from 'react'


function DeleteButton({remove, id}) {
    <button  title="delBtn"onClick={() => remove(id)} class="p-2 mb-1 bg-danger text-white delete-button">Delete</button>
    
    }



export default DeleteButton;