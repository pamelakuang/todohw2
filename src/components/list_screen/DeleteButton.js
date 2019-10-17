import React, { Component } from 'react'

export class DeleteButton extends Component {
    deleteItem = (e) => {
        e.stopPropagation();
        const index = this.props.todoList.items.indexOf(this.props.listItem);
        this.props.addListItemRemovalTransaction(this.props.todoList, this.props.listItem, index);
        // this.props.todoList.items.splice(index, 1);
        this.props.loadList(this.props.todoList);
    }
    render() {
        return (
            <div className="list_item_delete_button"
            onClick={e=>this.deleteItem(e)}>
                    
            </div>
        )
    }
}

export default DeleteButton
