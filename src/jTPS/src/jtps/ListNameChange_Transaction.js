class ListNameChange_Transaction {

    currentList = null;
    newName = null;
    previousName = null;

    constructor(list, newname) {
        this.currentList = list;
        this.previousName = this.currentList.name;
        this.newName = newname;
    }

    doTransaction = () => {
        this.currentList.name = this.newName;
    }

    undoTransaction = () => {
        this.currentList.name = this.previousName;
    }
}

export default ListNameChange_Transaction