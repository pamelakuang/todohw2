class MoveUp_Transaction {
    
    currentList = null;
    currentItem = null;

    constructor(todoList, todoItem) {
        this.currentList = todoList;
        this.currentItem = todoItem;
    }

    doTransaction = () => {
        let index = this.currentList.items.indexOf(this.currentItem);
        let temp = this.currentList.items[index];
        this.currentList.items[index] = this.currentList.items[index-1];
        this.currentList.items[index-1] = temp;
        // move up 
    }

    undoTransaction = () => {
        let index = this.currentList.items.indexOf(this.currentItem);
        let temp = this.currentList.items[index];
        this.currentList.items[index] = this.currentList.items[index+1];
        this.currentList.items[index+1] = temp;
        
        // move down 
    }
}

export default MoveUp_Transaction