import React, { Component } from 'react'

export class Modal extends Component {
    render() {
        return (
            <div id="modal_yes_no_dialog">
                <div id="modal_content">
                        <p>Delete List?</p>
                        <p><span>Are you sure you want to delete list?</span></p>
                        <div>
                            <button id="modal_yes_button"
                                onClick = {e => this.props.deleteList()}>Yes</button>
                            <button id="modal_no_button"
                                onClick = {e => this.props.hideDialog()}>No</button>
                        </div>
                        <p>The list will not be retrivable.</p>
                    </div>
            </div>

        )
    }
}

export default Modal
