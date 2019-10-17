import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import AddItem from './AddItem'
import Modal from './Modal'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    changeName = e => {
        this.props.addNameChangeTransaction(this.props.todoList, e.target.value);
        //this.props.todoList.name = e.target.value;
        this.props.loadList(this.props.todoList);
    }

    changeOwner = e => {
        this.props.addOwnerChangeTransaction(this.props.todoList, e.target.value);
        //this.props.todoList.owner = e.target.value;
        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash 
                    showDialog={this.props.showDialog}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            onChange={this.changeName}
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            onChange={this.changeOwner}
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} loadList = {this.props.loadList} editItem={this.props.editItem}
                processSortItemsByTask={this.props.processSortItemsByTask}
                processSortItemsByStatus={this.props.processSortItemsByStatus}
                processSortItemsByDueDate={this.props.processSortItemsByDueDate}
                addMoveUpTransaction={this.props.addMoveUpTransaction}
                addMoveDownTransaction={this.props.addMoveDownTransaction}
                addListItemRemovalTransaction={this.props.addListItemRemovalTransaction}/>
                <AddItem goItem={this.props.goItem}/>
                <Modal deleteList={this.props.deleteList} hideDialog={this.props.hideDialog}/>
            </div>
        )
    }
}

export default ListScreen
