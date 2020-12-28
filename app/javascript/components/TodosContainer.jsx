import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
} from "../actions/actionCreators";

class TodosContainer extends Component {
    /* without redux
      getTodos() {
        axios
          .get("/api/v1/todos")
          .then((response) => {
            this.setState({ todos: response.data });
          })
          .catch((error) => console.log(error));
      }
    */
    getTodos() {
        axios
            .get("/api/v1/todos.json")
            .then((response) => {
                this.props.dispatch(loadTodos(response.data));
            })
            .catch((error) => console.log(error));
    }

    createTodo = (e) => {
        if (e.key === "Enter" && !(this.getTitle.value === "")) {
            axios
                .post("/api/v1/todos.json", { todo: { title: this.getTitle.value } })
                .then((response) => {
                    this.props.dispatch(addTodo(response.data.id, response.data.title));
                    this.getTitle.value = "";
                })
                .catch((error) => console.log(error));
        }
    };

    updateTodo = (e, id) => {
        axios
            .put(`/api/v1/todos/${id}.json`, { todo: { done: e.target.checked } })
            .then((response) => {
                this.props.dispatch(toggleTodo(id));
            })
            .catch((error) => console.log(error));
    };

    deleteTodo = (id) => {
        axios
            .delete(`/api/v1/todos/${id}.json`)
            .then((response) => {
                this.props.dispatch(deleteTodo(id));
            })
            .catch((error) => console.log(error));
    };

    componentDidMount() {
        this.getTodos();
    }

    render() {
        return (
            <div>
                <div className="inputContainer">
                    <input
                        className="taskInput"
                        type="text"
                        placeholder="Add a task"
                        maxLength="50"
                        onKeyPress={this.createTodo}
                        ref={(input) => (this.getTitle = input)}
                    />
                </div>
                <div className="listWrapper">
                    <ul className="taskList">
                        {this.props.todos.map((todo) => {
                            return (
                                <li className="task" key={todo.id} id={todo.id}>
                                    <input
                                        className="taskCheckbox"
                                        type="checkbox"
                                        checked={todo.done}
                                        onChange={(e) => this.updateTodo(e, todo.id)}
                                    />
                                    <label className="taskLabel">{todo.title}</label>
                                    <span
                                        className="deleteTaskBtn"
                                        onClick={(e) => this.deleteTodo(todo.id)}
                                    >
                    x
                  </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
    };
};

export default connect(mapStateToProps)(TodosContainer);
