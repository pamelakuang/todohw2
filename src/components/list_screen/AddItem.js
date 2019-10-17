import React, { Component } from 'react'

export class AddItem extends Component {
    render() {
        return (
            <div className="list_item_add_card"
            onClick={this.props.goItem}>
            
            </div>
        )
    }
}

export default AddItem
