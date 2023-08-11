import React from "react";

const Modal = ({ closeModal, deleteFunc, bookingId }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <h3>Delete booking?</h3>
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              closeModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteFunc(bookingId);
              closeModal(false);
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
