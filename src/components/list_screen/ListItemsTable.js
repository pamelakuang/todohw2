import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                <div className="list_item_task_header" onClick={this.props.processSortItemsByTask}>Task</div>
                <div className="list_item_due_date_header" onClick={this.props.processSortItemsByDueDate}>Due Date</div>
                <div className="list_item_status_header" onClick={this.props.processSortItemsByStatus}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            todoList={this.props.todoList}
                            listItem={todoItem}
                            loadList={this.props.loadList}
                            editItem={this.props.editItem}
                            addMoveUpTransaction={this.props.addMoveUpTransaction}
                            addMoveDownTransaction={this.props.addMoveDownTransaction}
                            addListItemRemovalTransaction={this.props.addListItemRemovalTransaction}/>
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
