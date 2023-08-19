import React from "react";

function SortOrder ({order, onToggleSort}) {

    return (
        <div>
        <button onClick={onToggleSort}>
        {order === 'ASC' ? 'ASC' : 'DESC'}
        </button>
        </div>
    );
};
export default SortOrder;