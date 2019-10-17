import React, { Component } from 'react'

export class MoveupButton extends Component {
    moveUp = (e) => {
        e.stopPropagation();
        const index = this.props.todoList.items.indexOf(this.props.listItem);
        if (index > 0) {
            this.props.addMoveUpTransaction(this.props.todoList,this.props.listItem);
        }
        // if (index > 0) {
        //     const temp = this.props.todoList.items[index];
        //     this.props.todoList.items[index] = this.props.todoList.items[index-1];
        //     this.props.todoList.items[index-1] = temp;
        this.props.loadList(this.props.todoList);
        // }

    }
    render() {
        if (this.props.todoList.items.indexOf(this.props.listItem) === 0) {
            return (
                <div className="list_item_move_up_button disabled"
                onClick={e => this.moveUp(e)}>
                </div>
            )
        }
        else {
            return (
            <div className="list_item_move_up_button"
            onClick={e => this.moveUp(e)}>
                
            </div>
            )
        }
    }
}

export default MoveupButton
