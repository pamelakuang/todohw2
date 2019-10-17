import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    render() {
        return (
            <div id ='todo_item' >
                <div id="item_form_container">
                    
                    <h1>Items</h1>
                    
                    <p>
                        <span id="item_description_prompt">Description: </span>
                        <input type="text" id="item_description_textfield" defaultValue={(this.props.todoItem) ? this.props.todoItem.description: null}/>
                    </p>

                    <p>
                        <span id="item_assigned_to_prompt" >Assigned to: </span>
                        <input type="text" id="item_assigned_to_textfield" defaultValue={(this.props.todoItem) ? this.props.todoItem.assigned_to: null}/>
                    </p>
                    <p>
                        <span id="item_due_date_prompt">Due Date: </span>
                        <input type="date" id="item_due_date_picker" defaultValue={(this.props.todoItem) ? this.props.todoItem.due_date: null}/>
                    </p>
                    <p>
                        <span id="item_completed_prompt" >Completed: </span>
                        <input type="checkbox" id="item_completed_checkbox" defaultChecked={(this.props.todoItem) ? this.props.todoItem.completed: false}/>
                    </p>
                    <p>
                        <button id="item_form_submit_button"
                            onClick={this.props.addItem}>Submit</button>
                        <button id="item_form_cancel_button"
                            onClick={this.props.cancelItemChanges}>Cancel</button>
                    </p>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
