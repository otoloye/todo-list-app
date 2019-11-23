import React, { Component } from 'react';
import './App.css';
import { isNotPresent } from './utils/helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      disableButton: false
    };
  }

  componentDidMount() {
    const todos = localStorage.getItem('myTodo')
      ? JSON.parse(localStorage.getItem('myTodo'))
      : [];
    this.setState({ todos, newTodo: '', disableButton: false });
  }

  clearTodo = () => {
    localStorage.removeItem('myTodo');
    this.setState({ todos: [] });
  };

  handleChange = e => {
    this.setState({
      newTodo: e.target.value,
      disableButton: !isNaN(Number(e.target.value))
    });
    if (e.charCode === 13) {
      this.handleSubmit();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const todo = this.state.newTodo.trim();

    if (todo.length > 0 && isNotPresent(this.state.todos, todo)) {
      this.setState(() => {
        const todos = [...this.state.todos, { title: todo, completed: false }];
        localStorage.setItem('myTodo', JSON.stringify(todos));
        return {
          todos,
          newTodo: ''
        };
      });
    }
  };

  handleChecked = todo => {
    const todos = [...this.state.todos].map(item => {
      if (item.title === todo.title) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({ todos });
    localStorage.setItem('myTodo', JSON.stringify(todos));
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
          {this.state.todos.map(todo => (
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
                onChange={e => this.handleChecked(todo)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
