//import React, { Component } from 'react'
import jsTPS_Transaction from './jsTPS_Transaction'

class jsTPS {
//export class jsTPS extends Component {
    // performingDo=null;
    // performingUndo=null
    // transactions = null;
    // mostRecentTransaction = null;
    constructor() {
        this.performingDo=false;
        this.performingUndo=false;
        this.transactions = [];
        this.mostRecentTransaction = -1;
    }

    isPerformingDo = () => {
        return this.performingDo;
    }

    isPerformingUndo = () => {
        return this.performingUndo;
    }

    addTransaction = (transaction) => {
        if ((this.mostRecentTransaction < 0) || this.mostRecentTransaction < (this.transactions.length - 1)) {
            for (let i = this.transactions.length-1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }
        this.transactions.push(transaction);
        this.doTransaction();
    }
    
    doTransaction = () => {
        if(this.hasTransactionToRedo()) {
            this.performingDo = true;
            var transaction = this.transactions[this.mostRecentTransaction+1];
            transaction.doTransaction();
            this.mostRecentTransaction = this.mostRecentTransaction + 1;
            this.performingDo = false;
        }
    }
    peekUndo = () => {
        if(this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        else
            return null;
    }
    peekDo = () => {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction+1];
        }
        else 
            return null;
    }

    undoTransaction = () => {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            var transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }
    clearAllTransactions = () => {
        this.transactions = [];
        this.mostRecentTransaction = -1;
    }
    
    getSize = () => {
        return this.transactions.length;
    }

    getRedoSize = () => {
        return this.getSize() - this.mostRecentTransaction - 1;
    }
    
    getUndoSize = () => {
        return this.mostRecentTransaction + 1;
    }
    
    hasTransactionToUndo = () => {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo = () => {
        return this.mostRecentTransaction < (this.transactions.length-1);
    }
    
    toString = () => {
        var text = "--Number of Transactions: " + this.transactions.length + "\n";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (let i = 0; i <= this.mostRecentTransaction; i++) {
            var jT = this.transactions[i];
            text += "----" + jT.toString() + "\n";
        }
        return text;
    }
}


/*class ListNameChange_Transaction {

    nameChangeList = [];
    currentLists = [];
    constructor(initName, list) {
        this.nameChangeList.push(initName);
        this.currentLists.push(list);
    }
    doTransaction = () => {

    }

    undoTransaction = () => {
        
    }
}*/


export default jsTPS
