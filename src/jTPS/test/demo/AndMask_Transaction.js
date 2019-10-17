import Num from './Num'

class AndMask_Transaction {
    num = new Num();
    intNum = null;
    mask = null;

    constructor(initNum, initIntNum, initMask) {
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction = () => {
        this.num.andMask(this.mask);
    }

    undoTransaction = () => {
        this.num.setNum(this.intNum);
    }

    toString = () => {
        return "And Mask " + this.mask;
    }
}

export default AndMask_Transaction