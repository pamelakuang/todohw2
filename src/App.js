import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jTPS/src/jtps/jsTPS'
import MoveUpTransaction from './jTPS/src/jtps/MoveUp_Transaction'
import MoveDownTransaction from './jTPS/src/jtps/MoveDown_Transaction'
import ListNameChangeTransaction from './jTPS/src/jtps/ListNameChange_Transaction'
import ListOwnerChangeTransaction from './jTPS/src/jtps/ListOwnerChange_Transaction'
import ListItemRemovalTransaction from './jTPS/src/jtps/ListItemRemoval_Transaction'
import ListItemEditTransaction from './jTPS/src/jtps/ListItemEdit_Transaction'
import ListSortingTransaction from './jTPS/src/jtps/ListSorting_Transaction'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  tps = new jsTPS();
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    todoItem: null,
    isEditingItem: false,
    sortingCriteria: null,
  }

  addMoveUpTransaction = (list, item) => {
    this.tps.addTransaction(new MoveUpTransaction(list, item));
  }

  addMoveDownTransaction = (list, item) => {
    this.tps.addTransaction(new MoveDownTransaction(list, item));
  }

  addNameChangeTransaction = (list, newName) => {
    this.tps.addTransaction(new ListNameChangeTransaction(list, newName));
  }

  addOwnerChangeTransaction = (list, newOwner) => {
    this.tps.addTransaction(new ListOwnerChangeTransaction(list, newOwner));
  }

  addListItemRemovalTransaction = (list, item, index) => {
    this.tps.addTransaction(new ListItemRemovalTransaction(list, item, index));
  }
  
  addItemEditTransaction = (list, currentItem, editOrNewItem, isEditingItem) => {
    this.tps.addTransaction(new ListItemEditTransaction(list, currentItem, editOrNewItem, isEditingItem));
  }

  addListSortingTransaction = (list, sortingCriteria) => {
    this.tps.addTransaction(new ListSortingTransaction(list, sortingCriteria));
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  goItem = () => {
    this.setState( {currentScreen: AppScreen.ITEM_SCREEN});
  }

  cancelItemChanges = () => {
    this.setState( {currentScreen: AppScreen.LIST_SCREEN});
    this.setState({todoItem: null});
    this.setState({isEditingItem: false});
  }
  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }
  
  editItem = (currentItem) => {
    this.setState({isEditingItem: true});
    this.setState({todoItem:currentItem});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }
  addItem = () => {
    let temp = {
      description: document.getElementById("item_description_textfield").value,
      assigned_to: document.getElementById("item_assigned_to_textfield").value,
      due_date: document.getElementById("item_due_date_picker").value,
      completed: document.getElementById("item_completed_checkbox").checked,
    }
    if (temp.description === "")
      temp.description = "Unknown";
    if (temp.assigned_to === "")
      temp.assigned_to = "Unknown";
    this.addItemEditTransaction(this.state.currentList, this.state.todoItem, temp, this.state.isEditingItem);

    this.loadList(this.state.currentList);
    this.setState({todoItem: null});
    this.setState({isEditingItem:false});
    // if (this.state.isEditingItem === false) {
      // const newItem = {
      //   key: this.state.currentList.items.length,
      //   description: document.getElementById("item_description_textfield").value,
      //   assigned_to: document.getElementById("item_assigned_to_textfield").value,
      //   due_date: document.getElementById("item_due_date_picker").value,
      //   completed: document.getElementById("item_completed_checkbox").checked,
      // // }
      // if (newItem.description === "")
      //   newItem.description = "Unknown";
      // if (newItem.assigned_to === "")
      //   newItem.assigned_to = "Unknown";
      // this.state.currentList.items.push(newItem);
    //}
    // else {
    //   let temp = this.state.todoItem;
    //   if (temp.description !== document.getElementById("item_description_textfield").value) {
    //     if (document.getElementById("item_description_textfield").value === "") {
    //       temp.description = "Unknown";
    //     }
    //     else 
    //       temp.description = document.getElementById("item_description_textfield").value;
    //   }
    //   if (temp.assigned_to !== document.getElementById("item_assigned_to_textfield").value) {
    //     if (document.getElementById("item_assigned_to_textfield").value === "") {
    //       temp.assigned_to = "Unknown";
    //     }
    //     else 
    //       temp.assigned_to = document.getElementById("item_assigned_to_textfield").value;
    //   }
    //   if (temp.due_date !== document.getElementById("item_due_date_picker").value) {
    //     temp.due_date = document.getElementById("item_due_date_picker").value;
    //   }
    //   if (temp.completed !== document.getElementById("item_completed_checkbox").checked)
    //     temp.completed = document.getElementById("item_completed_checkbox").checked;

    //   this.setState({todoItem: temp});
    //   this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    //}
  }
  addList = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    const newList = {
      key: this.state.todoLists.length,
      name: "Unknown",
      owner: "Unknown",
      items: []
    }
    this.setState( { todoLists: [...this.state.todoLists, newList]});
    this.setState( {currentList: newList});
    this.loadList(newList);
  }

  showDialog = () => {
    document.getElementById("modal_content").setAttribute("class","slide_in");
    document.getElementById("modal_yes_no_dialog").classList.add("is_visible");
  }

  hideDialog = () => {
    document.getElementById("modal_content").setAttribute("class", "slide_out");
    setTimeout(function() {
        document.getElementById("modal_yes_no_dialog").classList.remove("is_visible");
    },1500)
  }

  deleteList = () => {
    const index = this.state.todoLists.indexOf(this.state.currentList);
    this.state.todoLists.splice(index, 1);
    this.loadList();
    this.goHome();
  }

  processSortItemsByTask = () =>{
    // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
    if (this.state.sortingCriteria==="sort_by_task_increasing") {
        this.sortTasks("sort_by_task_decreasing");
    }
    // ALL OTHER CASES SORT BY INCREASING
    else {
      this.setState({sortingCriteria:"sort_by_task_increasing"});
      this.sortTasks("sort_by_task_increasing");
    }
}
processSortItemsByDueDate = () =>{
  // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
  if (this.state.sortingCriteria==="sort_by_due_date_increasing") {
      this.sortTasks("sort_by_due_date_decreasing");
  }
  // ALL OTHER CASES SORT BY INCREASING
  else {
    this.setState({sortingCriteria:"sort_by_due_date_increasing"});
    this.sortTasks("sort_by_due_date_increasing");
  }
}
  processSortItemsByStatus = () =>{
    // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
    if (this.state.sortingCriteria==="sort_by_status_increasing") {
        this.sortTasks("sort_by_status_decreasing");
    }
    // ALL OTHER CASES SORT BY INCREASING
    else {
      this.setState({sortingCriteria:"sort_by_status_increasing"});
      this.sortTasks("sort_by_status_increasing");
    }
  }
    sortTasks = (criteria) => {
      this.state.sortingCriteria = criteria;
      this.addListSortingTransaction(this.state.currentList, this.state.sortingCriteria);
      //this.state.currentList.items.sort(this.compare);
      this.loadList(this.state.currentList);
  }
    
  handleKeyPress = (e) => {
    if (this.state.currentScreen === AppScreen.LIST_SCREEN) {
      let button = String.fromCharCode(e.which).toLowerCase();
      if (e.ctrlKey && button === 'z') {
        this.tps.undoTransaction();
        this.setState({currentScreen: AppScreen.LIST_SCREEN});
      }
      else if (e.ctrlKey && button === 'y') {
        this.tps.doTransaction();
        this.setState({currentScreen: AppScreen.LIST_SCREEN});
      }
    }
  }
  render() {
    document.addEventListener('keydown', this.handleKeyPress);
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        addList={this.addList}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          loadList={this.loadList} 
          showDialog={this.showDialog}
          deleteList={this.deleteList}
          hideDialog={this.hideDialog}
          addList={this.addList}
          editItem={this.editItem}
          goItem={this.goItem}
          processSortItemsByTask={this.processSortItemsByTask}
          processSortItemsByStatus={this.processSortItemsByStatus}
          processSortItemsByDueDate={this.processSortItemsByDueDate}
          addMoveUpTransaction={this.addMoveUpTransaction}
          addMoveDownTransaction={this.addMoveDownTransaction}
          addNameChangeTransaction={this.addNameChangeTransaction}
          addOwnerChangeTransaction={this.addOwnerChangeTransaction}
          addListItemRemovalTransaction={this.addListItemRemovalTransaction}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
        //currentScreen={AppScreen.ITEM_SCREEN}
        todoItem={this.state.todoItem}
        addItem={this.addItem}
        cancelItemChanges={this.cancelItemChanges}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;