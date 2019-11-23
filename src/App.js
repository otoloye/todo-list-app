import React from 'react';
import './App.css';
import TodoClass from './todo-class';
import TodoFunc from './todo-func';

function App() {
  return (
    <div className="app-root">
      <TodoClass />
      <TodoFunc />
    </div>
  );
}

export default App;
