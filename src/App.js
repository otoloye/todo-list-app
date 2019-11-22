import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Todos: ['Buy Water', 'Eat Food', 'Look around'] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ Todos: e.target.value });
  }

  render() {
    return (
      <div className="todo-container">
        <ul className="todo-unordered-list">
          {this.state.Todos.map(todo => (
            <li>{todo}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter todo here"
            className="todo-input"
            value={this.state.Todos}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit} className="todo-button">
            Add todo
          </button>
        </div>
      </div>
    );
  }
}

export default App;
