import React, { useState } from 'react'
import axios from 'axios'
const path = 'https://youtube-videos-list.herokuapp.com/'

const AddVideo = ({ allData, handleSet, loadData }) => {
  const [toggle, setToggle] = useState(false)
  const [title, setTitle] = useState('')
  // const [search, setSearch] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAdd = () => {
    setToggle(!toggle)
  }

  const resetAddForm = () => {
    setToggle(!toggle)
    setTitle('')
    setUrl('')
  }

  const matchYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if (url.match(p)) return true
    return false
  }

  const validationCheck = () => {
    setErrorMessage('')
    let result = true
    let match = matchYoutubeUrl(url)
    if (title.length === 0 && (url === undefined || url === '' || !match)) {
      setErrorMessage('Please make sure you have entered both title and URL')
      result = false
    } else if (title.length === 0) {
      setErrorMessage('Please enter a valid title')
      result = false
    } else if (url === undefined || url === '' || !match) {
      setErrorMessage('Please enter a valid youtube URL')
      result = false
    }
    return result
  }

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault()
    if (validationCheck()) {
      const id = Math.max(...allData.map((v) => v.id)) + 1
      const newVideo = {
        id: id,
        title: title,
        url: url,
        rating: 0,
      }
      axios.post(path, newVideo).then(() => loadData())
      resetAddForm()
    }
  }

  //   function getOffset(el) {
  //   const rect = el.getBoundingClientRect();
  //   return {
  //     left: rect.left + window.scrollX,
  //     top: rect.top + window.scrollY
  //   };
  // }
  // const searchHandler = ({search}) => {
  //   console.log(search);
  //   console.log(getOffset(search).left,getOffset(search).top );
  //   setSearch(search.value);
  //   const searchPanel = {
  //       position: "fixed",
  //       top: 0,
  //       left: 0,
  //       backgroundColor: "#45455"
  //     }
  //   return(
  //     <div style={searchPanel}>
  //      <ul>
  //         <li>list 1</li>
  //       </ul>
  //     </div>
  //   );
  // }

  // const SearchYoutube = ({ searchHandler }) => {
  //   return(

  //     <div className="col">
  //                 <label htmlFor="searchOnYoutube">Search on Youtube</label>
  //                  <input
  //                   type="text"
  //                   name="searchOnYoutube"
  //                   id="searchOnYoutube"
  //                   className="form-control"
  //                   value={search}
  //                   // onChange={(e) => e.target.value}/>}
  //                   />
  //               </div>
  //                   )

  // }

  return (
    <>
      <button className="btn btn-success mr-4" onClick={handleAdd}>
        Add Video
      </button>
      <div className="add-video">
        <div className={toggle ? 'display-block' : 'display-none'}>
          <form onSubmit={handleSubmitEvent}>
            <div className="row align-items-end">
              {/* <SearchYoutube searchHandler = {searchHandler}/>  */}
              <div className="col">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="form-control"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary d-block">
                Save
              </button>
            </div>
          </form>
          <p className="error">{errorMessage}</p>
        </div>
      </div>
    </>
  )
}

export default AddVideo
