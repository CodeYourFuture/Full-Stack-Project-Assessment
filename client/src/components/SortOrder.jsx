import React from "react";

function SortOrder ({order, onToggle}) {
    const sortOrder = () => {
        onToggle();
    };

    return (
        <div>
        <button onClick={sortOrder}>
        {order === 'ASC' ? 'ASC' : 'DESC'}
        </button>
        </div>
    );
};
export default SortOrder;