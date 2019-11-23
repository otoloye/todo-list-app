import React, { useState } from 'react';
import { isNotPresent } from './utils/helpers';

// Use this if not using useEffect()
const initialTodos = localStorage.getItem('myTodoFunc')
  ? JSON.parse(localStorage.getItem('myTodoFunc'))
  : [];

const TodoFunc = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [disableButton, setDisableButton] = useState(false);

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
      setTodos([...todos, { title: todo, completed: false }]);
      localStorage.setItem('myTodoFunc', JSON.stringify(todos));
      setNewTodo('');
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
