import React, { useState } from "react";

const ConfirmModal = ({ buttonText, handleConfirm }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
    {/* Modal Trigger */}
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setConfirm(true)}
      >{buttonText}
      </button>

      {/* <!-- Modal --> */}
      {confirm && (
        <div
          className="modal d-block"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete Video
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setConfirm(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to delete this video?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setConfirm(false)}
                >Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleConfirm();
                    setConfirm(false);
                  }}
                >Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
