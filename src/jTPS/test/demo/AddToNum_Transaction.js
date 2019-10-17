//package demo;

//import jtps.jTPS_Transaction;
import Num from './Num'

class AddToNum_Transaction {
    num = new Num();
    amountToAdd = null;

    constructor(initNum, initAmountToAdd) {
        this.num = initNum;
        this.amountToAdd = initAmountToAdd;
    }

    doTransaction = () => {
        let oldNum = num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    undoTransaction = () => {
        let oldNum = num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }

    toString = () => {
        return "Add" + this.amountToAdd;
    }
}

export default AddToNum_Transaction