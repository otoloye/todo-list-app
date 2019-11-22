import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ['Buy Water', 'Eat Food', 'Look around'],
      newTodo: ''
    };
  }

  clearTodo = () => {
    this.setState({ todos: [] });
  };

  handleChange = e => {
    this.setState({ newTodo: e.target.value });
  };

  handleSubmit = () => {
    this.setState(state => {
      const todos = state.todos.concat(state.newTodo);
      return {
        todos,
        newTodo: ''
      };
    });
  };

  render() {
    return (
      <div className="todo-container">
        <ul className="todo-unordered-list">
          {this.state.todos.map(todo => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter todo here"
            className="todo-input"
            value={this.state.newTodo}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={this.handleSubmit}
            className="todo-button"
          >
            Add Todo
          </button>

          <button
            type="button"
            onClick={this.clearTodo}
            className="todo-button"
          >
            Clear Todo
          </button>
        </div>
      </div>
    );
  }
}

export default App;
