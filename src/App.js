import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ['Buy Water', 'Eat Food', 'Look around'],
      newTodo: '',
      disableButton: false
    };
  }

  clearTodo = () => {
    this.setState({ todos: [] });
  };

  handleChange = e => {
    this.setState({
      newTodo: e.target.value,
      disableButton: !isNaN(Number(e.target.value))
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const todo = this.state.newTodo.trim();

    if (todo.length > 0 && isNaN(Number(todo))) {
      this.setState(state => {
        const todos = [...state.todos, state.newTodo];
        return {
          todos,
          newTodo: ''
        };
      });
    }
  };

  render() {
    return (
      <div className="todo-container">
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter todo here"
              className="todo-input"
              value={this.state.newTodo}
              onChange={this.handleChange}
            />

            <button
              type="submit"
              className="todo-button"
              disabled={this.state.disableButton}
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
          </form>
          <ul className="todo-unordered-list">
            {this.state.todos.map(todo => (
              <li key={todo}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
