import React from 'react';
import './App.css';

function App() {
  const Todos = ['Buy Water', 'Eat Food', 'Look around'];

  return (
    <div className="todo-container">
      <ul className="todo-unordered-list">
        {Todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter todo here"
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Add todo
        </button>
      </div>
    </div>
  );
}

export default App;
