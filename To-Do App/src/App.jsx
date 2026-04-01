import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;

    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Todo App</h2>

      {}
      <input
        type="text"
        value={input}
        placeholder="Enter a task..."
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTodo} style={{ marginLeft: "10px" }}>
        Add
      </button>

      {}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {todo}
            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;