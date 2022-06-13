import React from "react";
import Video from "./Video.js";

const List = ({ list, onRemove }) => (
  <div>
    {list.map((item) => (
      <Video key={item.id} item={item} onRemove={onRemove} />
    ))}
  </div>
);

export default List;
