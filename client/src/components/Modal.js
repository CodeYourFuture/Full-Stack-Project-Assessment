import React from "react";
import AddButton from "./buttons/AddButton";
import CancelButton from "./buttons/CancelButton";

const Modal = ({ cancelModal, add, title, url }) => {
    return (
        <div className="modal-card d-flex justify-content-center align-items-center">
            <div className="card p-5">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h4 className="card-title">Add Video</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputTitle" placeholder="Title" onChange={title} />
                    </div>
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