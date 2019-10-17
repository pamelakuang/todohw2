import React, { Component } from 'react'

export class MovedownButton extends Component {
    moveDown = (e) => {
        e.stopPropagation();
        const index = this.props.todoList.items.indexOf(this.props.listItem);
        if (index < this.props.todoList.items.length-1) {
            this.props.addMoveDownTransaction(this.props.todoList, this.props.listItem);
            // const temp = this.props.todoList.items[index];
            // this.props.todoList.items[index] = this.props.todoList.items[index+1];
            // this.props.todoList.items[index+1] = temp;
        }
        this.props.loadList(this.props.todoList);
    }
    render() {
        if (this.props.todoList.items.indexOf(this.props.listItem) === this.props.todoList.items.length-1) {
            return (
                <div className="list_item_move_down_button disabled"
                onClick={e => this.moveDown(e)}>
                </div>
            )
        }
        else {
            return (
            <div className="list_item_move_down_button"
            onClick={e => this.moveDown(e)}>
                
            </div>
            )
        }
    }
}

export default MovedownButton
