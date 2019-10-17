class ListOwnerChange_Transaction {
    currentList = null;
    previousOwner = null;
    newOwner = null;

    constructor(todoList, newowner) {
        this.currentList = todoList;
        this.previousOwner = this.currentList.owner;
        this.newOwner = newowner;
    }

    doTransaction = () => {
        this.currentList.owner = this.newOwner;
    }

    undoTransaction = () => {
        this.currentList.owner = this.previousOwner;
    }
}
export default ListOwnerChange_Transaction