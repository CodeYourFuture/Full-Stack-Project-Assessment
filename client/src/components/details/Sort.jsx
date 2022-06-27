import React, { useState, useEffect } from 'react'

const Sort = ({ sortHandler }) => {
  const [state, setState] = useState(false)
  const [selected, setSelected] = useState('title')
  const toggle = () => {
    setState(!state)
  }

  useEffect(()=>{
    sortHandler(selected, state)
  },[selected, state])

  return (
    <div className="sort">
      <select
        name="sort"
        id="sort"
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="title">By Title</option>
        <option value="rating">By Rating</option>
        <option value="id">By ID</option>
        <option value="post_date">By Posted</option>
      </select>

      <div className="asc">{state?'Ascending':'Descending'}    
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round" onClick={toggle}>
        </span>
      </label>
       </div>
    </div>
  )
}

export default Sort
