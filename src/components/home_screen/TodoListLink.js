import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoListLink extends Component {
    render() {
        if (this.props.todoList.name === '') {
            this.props.todoList.name = "Unknown";
        } 
        if (this.props.todoList.owner === '') {
            this.props.todoList.owner = "Unknown";
        }
        return (
            <a 
                className='home_list_link'
                onClick={this.props.loadList.bind(this, this.props.todoList)}
            >
                {this.props.todoList.name}<br />
            </a>
        )
    }
}

TodoListLink.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default TodoListLink
