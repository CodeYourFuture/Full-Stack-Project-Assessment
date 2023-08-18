import React from "react";

import "./Modal.css";

const Modal = ({ closeModal, deleteFunc }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <h3>Delete video?</h3>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteFunc();
              closeModal(false);
            }}
          >
            DELETE
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              closeModal();
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
