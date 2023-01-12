import React from "react";
import AddButton from "./buttons/AddButton";
import CancelButton from "./buttons/CancelButton";

const Modal = ({ cancelModal, add, title, url, err, urlValue, titleValue }) => {

    return (
        <div className="modal-card d-flex justify-content-center align-items-center">
            <div className="card p-5">
                <form method="post" onSubmit={(e) => e.preventDefault()}>
                    <h4 className="card-title">Add Video</h4>
                    {err && titleValue.length <= 0 ? <label className="text-danger">Title is required</label> : ""}
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputTitle" placeholder="Title" onChange={title} />
                    </div>
                    {err && (urlValue.length <= 0)?
                        <label className="text-danger">Url is required</label> : ""}
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputUrl" placeholder="Url" onChange={url} />
                    </div>
                    <div>
                        <CancelButton cancelModal={cancelModal} />
                        <AddButton add={add} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;