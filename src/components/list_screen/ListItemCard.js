import React, { Component } from 'react'
import MoveupButton from './MoveupButton'
import MovedownButton from './MovedownButton'
import DeleteButton from './DeleteButton'

export class ListItemCard extends Component {
    render() {
        if (this.props.listItem.completed === true) {
            return (
                <div className='list_item_card' 
                onClick={e => this.props.editItem(this.props.listItem)}>
                    <div className='list_item_card_description'>
                        {this.props.listItem.description}
                    </div>
                    <div className='list_item_card_assigned_to'>
                        Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                    </div>
                    <div className='list_item_card_due_date'>
                        {this.props.listItem.due_date}
                    </div>
                    <div className='list_item_card_completed'>
                        Completed
                    </div>
                    <MoveupButton todoList = {this.props.todoList} listItem = {this.props.listItem} 
                    loadList = {this.props.loadList} addMoveUpTransaction={this.props.addMoveUpTransaction}/>
                    <MovedownButton todoList = {this.props.todoList} listItem = {this.props.listItem} 
                    loadList = {this.props.loadList} addMoveDownTransaction={this.props.addMoveDownTransaction}/>
                    <DeleteButton todoList = {this.props.todoList} listItem = {this.props.listItem}
                    loadList = {this.props.loadList} addListItemRemovalTransaction={this.props.addListItemRemovalTransaction}/>
                </div>
            )
        }
        else {
            return (
                <div className='list_item_card'
                onClick={e => this.props.editItem(this.props.listItem)}>
                    <div className='list_item_card_description'>
                        {this.props.listItem.description}
                    </div>
                    <div className='list_item_card_assigned_to'>
                        Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                    </div>
                    <div className='list_item_card_due_date'>
                        {this.props.listItem.due_date}
                    </div>
                    <div className='list_item_card_not_completed'>
                        Pending
                    </div>
                    <MoveupButton todoList = {this.props.todoList} listItem = {this.props.listItem} 
                    loadList = {this.props.loadList} addMoveUpTransaction={this.props.addMoveUpTransaction}/>
                    <MovedownButton todoList = {this.props.todoList} listItem = {this.props.listItem}
                    loadList = {this.props.loadList} addMoveDownTransaction={this.props.addMoveDownTransaction}/>
                    <DeleteButton todoList = {this.props.todoList} listItem = {this.props.listItem}
                    loadList = {this.props.loadList} addListItemRemovalTransaction={this.props.addListItemRemovalTransaction}/>
                </div>
            )
        }
    }
}

export default ListItemCard
