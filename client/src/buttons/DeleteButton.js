import React from "react";

function DeleteButton({remove, id}) {
    return (
      <button
        title="delBtn"
        onClick={() => remove(id)}
        class="text-white delete-button"
      >
        Delete
      </button>
    );
}
export default DeleteButton