class ListItemRemoval_Transaction {

    currentList = null;
    itemRemoved = null;
    indexOfItem = null; 

    constructor(todoList, todoItem, index) {
        this.currentList = todoList;
        this.itemRemoved = todoItem;
        this.indexOfItem = index;
    }

    doTransaction = () => {
        this.currentList.items.splice(this.indexOfItem, 1);
    }

    undoTransaction = () => {
        this.currentList.items.splice(this.indexOfItem, 0, this.itemRemoved);
    }
}

export default ListItemRemoval_Transaction