import React, { useState } from 'react'

const AddVideo = ({ setVideos, videos }) => {
  function useFormState(initial) {
    const [value, setValue] = useState(initial)
    function setEventValue(event) {
      setValue(event.target.value)
    }
    return [value, setEventValue]
  }
  const [title, setTitle] = useFormState('')
  const [url, setUrl] = useFormState('')

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault()
    const id = Math.max(...videos.map((v) => v.id)) + 1
    console.log(videos)
    const newVideo = {
      id: id,
      title: title,
      url: url,
      rating: 0,
    }
    console.log(newVideo)
    setVideos((previous) => previous.concat(newVideo))
  }
  return (
    <>
      <div className="add-video">
        <a
          className="btn btn-success mr-4"
          data-toggle="collapse"
          href="#collapseAdd"
          id="collapseAddBtn"
          role="button"
          aria-expanded="false"
          aria-controls="collapseAdd"
        >
          Add Video
        </a>
        <div className="collapse form-group" id="collapseAdd">
          <form onSubmit={handleSubmitEvent}>
            <div className="row align-items-end">
              <div className="col">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  onChange={setTitle}
                />
              </div>
              <div className="col">
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="form-control"
                  onChange={setUrl}
                />
              </div>
              <button type="submit" className="btn btn-primary d-block">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddVideo
