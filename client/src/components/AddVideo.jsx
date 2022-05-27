import React, { useState } from 'react'

const AddVideo = ({ handleSubmitEvent }) => {
  const [showNew, setShowNew] = useState(false)
  const showAddNew = () => {
    setShowNew(!showNew)
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
                />
              </div>
              <div className="col">
                <label htmlFor="url">Url</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary d-block">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="add-video">
        <button className="btn btn-success mr-4" onClick={showAddNew}>
          Add Video
        </button>
        {showNew && (
            <form onSubmit={handleSubmitEvent}>
              <div className="row align-items-end">
                <div className="col">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label htmlFor="url">Url</label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary d-block">
                  Save
                </button>
              </div>
            </form>
        )}
      </div>
    </>
  )
}

export default AddVideo
