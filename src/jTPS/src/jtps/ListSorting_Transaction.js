class ListSorting_Transaction {

    currentList = null;
    items = [];
    sortingCriteria = null;
    constructor(list, sortCriteria) {
        this.currentList = list;
        this.items = this.currentList.items.slice();
        this.sortingCriteria = sortCriteria;
    }

    compare = (item1, item2) =>{
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.sortingCriteria==="sort_by_task_decreasing"
            || this.sortingCriteria==="sort_by_status_decreasing"
            || this.sortingCriteria==="sort_by_due_date_decreasing") {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        // SORT BY ITEM DESCRIPTION
        if (this.sortingCriteria==="sort_by_task_increasing"
            || this.sortingCriteria==="sort_by_task_decreasing") {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        else if (this.sortingCriteria==="sort_by_due_date_increasing"
        || this.sortingCriteria==="sort_by_due_date_decreasing") {
            if (item1.due_date < item2.due_date)
                return -1;
            else if (item1.due_date > item2.due_date)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
      }
    
    doTransaction = () => {
        // sort
        this.currentList.items.sort(this.compare);
    }

    undoTransaction = () => {
        this.currentList.items = [...this.items];
    }

}
export default ListSorting_Transaction