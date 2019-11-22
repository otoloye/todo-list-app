import React, { Component } from 'react';
import './App.css';
import { isNotPresent } from './utils/helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ title: 'Buy Water', completed: false }],
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
        return {
          todos,
          newTodo: ''
        };
      });
    }
  };

  handleChecked = e => {
    e.preventDefault();
    this.setState(() => {});
  };

  // updateTodo = index => {
  //   this.setState(state => {
  //     const todo = state.todos.map((item, j) => {
  //       if (j === index) {
  //         return item;
  //       }
  //     });
  //   });
  // };

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
          {this.state.todos.map((todo, index) => (
            <div className="todo-item" key={index}>
              {/* {todo.completed} ? */}
              <p
                className={
                  todo.completed
                    ? 'todo-completed todo-item-title'
                    : 'todo-item-title'
                }
              >
                {todo.title}
              </p>
              <input type="checkbox" onClick={e => this.handleChecked(e)} />
              {/* : <p className="todo-item-title">{todo.title}</p>
              <input type="checkbox" onClick={this.handleChecked} /> */}
              {/* <button type="button" onClick={this.updateTodo(index)}>
                Edit
              </button> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
