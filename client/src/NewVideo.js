import React from 'react'
import AddBtn from './AddBtn'

const NewVideo = () => {
  return(
   <form action="#" className='form'> 
      <div className="form-control">
      <label>Video: </label>
          <input type="text" className='input' />
      </div>
      <div className="form-control">
      <label>Title: </label>
          <input type="text" className='input' />
      </div>
      <div className="form-control">
        <label>Url: </label>
          <input type="url" className='input' />
      </div>
     <AddBtn />
   </form>
  )
    
}

export default NewVideo