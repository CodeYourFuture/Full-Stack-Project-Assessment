import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function handleNewTodoChange(event) {
    setNewTodo(event.target.value);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  }

  function handleRemoveTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
