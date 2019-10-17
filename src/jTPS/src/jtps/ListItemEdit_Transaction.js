class ListItemEdit_Transaction {

    currentList = null;
    edit_new_item = null;
    currentItem = null;
    isEditingItem = null;
    prevDescription = null;
    prevAssignedTo = null;
    prevDueDate = null;
    prevCompleted = null;

    constructor(todoList, currentitem, editOrnewitem, editingItem) {
        this.currentList = todoList;
        this.currentItem = currentitem;
        this.edit_new_item = editOrnewitem;
        this.isEditingItem = editingItem;
    }

    doTransaction = () => {
        if (this.isEditingItem === false) {
            this.edit_new_item.key = this.currentList.items.length;
            this.currentList.items.push(this.edit_new_item);
        }
        else {
            this.prevDescription = this.currentItem.description;
            this.prevAssignedTo = this.currentItem.assigned_to;
            this.prevDueDate = this.currentItem.due_date;
            this.prevCompleted = this.currentItem.completed;

            this.currentItem.description = this.edit_new_item.description;
            this.currentItem.assigned_to = this.edit_new_item.assigned_to;
            this.currentItem.due_date = this.edit_new_item.due_date;
            this.currentItem.completed = this.edit_new_item.completed;
        }
    }

    undoTransaction = () => {
        if (this.isEditingItem === false) {
            let index = this.currentList.items.indexOf(this.edit_new_item);
            this.currentList.items.splice(index, 1);
        }
        else {
            this.currentItem.description = this.prevDescription;
            this.currentItem.assigned_to = this.prevAssignedTo;
            this.currentItem.due_date = this.prevDueDate;
            this.currentItem.completed = this.prevCompleted;
        }
    }
}

export default ListItemEdit_Transaction