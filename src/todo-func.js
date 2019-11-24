import React, { useState, useEffect } from 'react';
import { isNotPresent } from './utils/helpers';

// NOTE: Use this if not using useEffect()
// Remember to: useState([initialTodos]) on

// const initialTodos = localStorage.getItem('myTodoFunc')
//   ? JSON.parse(localStorage.getItem('myTodoFunc'))
//   : [];

const TodoFunc = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  let todosCopy = todos;

  useEffect(() => {
    const initialTodos = localStorage.getItem('myTodoFunc')
      ? JSON.parse(localStorage.getItem('myTodoFunc'))
      : [];
    setTodos(initialTodos);
    setNewTodo('');
    setDisableButton(false);
  }, []);

  const clearTodo = () => {
    localStorage.removeItem('myTodoFunc');
    setTodos([]);
  };

  const handleChange = e => {
    setNewTodo(e.target.value);
    setDisableButton(!isNaN(Number(e.target.value)));
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const todo = newTodo.trim();
    if (todo.length > 0 && isNotPresent(todos, todo)) {
      todosCopy = [...todosCopy, { title: todo, completed: false }];
      setTodos(todosCopy);
      setNewTodo('');
      localStorage.setItem('myTodoFunc', JSON.stringify(todosCopy));
    }
  };

  const handleChecked = todo => {
    const todoList = [...todos].map(item => {
      if (item.title === todo.title) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodos(todoList);
    localStorage.setItem('myTodoFunc', JSON.stringify(todoList));
  };

  return (
    <div className="func-root">
      <h2>Todo List App using functional component</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter todo here"
            className="todo-input"
            value={newTodo}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="todo-button"
            disabled={disableButton}
          >
            Add Todo
          </button>

          <button type="button" onClick={clearTodo} className="todo-button">
            Clear Todo
          </button>
        </form>
        {todos.map(todo => (
          <div className="todo-item" key={todo.title}>
            <p
              className={
                todo.completed
                  ? 'todo-completed todo-item-title'
                  : 'todo-item-title'
              }
            >
              {todo.title}
            </p>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => handleChecked(todo)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoFunc;
