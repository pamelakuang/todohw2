import jsTPS from "../../src/jtps/jsTPS"
import Num from "../demo/Num";
import AddToNumTransaction from '../demo/AddToNum_Transaction'
import AndMaskTransaction from '../demo/AndMask_Transaction'

class jsTPS_Unit_Tests {
    
    testAdd = () => {
        tps = new jsTPS();
        num = new Num();

        if (num.getNum() === 0) 
            document.writeln("true");
        else
            document.writeln("false");
        
        tps.addTransaction(new AddToNumTransaction(num, 5));
        var assert = require('assert');
        assert.strictEqual(num.getNum(), 5);
        assert.strictEqual(num.getSize(), 1);
        assert.strictEqual(num.getRedoSize(), 0);
        assert.strictEqual(num.getUndoSize(), 1);

        /*if (num.getNum() === 5)
            document.writeln("true");
        else
            document.writeln("false");

        if (tps.getSize() === 1)
            document.writeln("true");
        else
            document.writeln("false");
        
        if (tps.getRedoSize() === 0) 
            document.writeln("true");
        else
            document.writeln("false");
        
        if (tps.getUndoSize() === 1)
            document.writeln("true");
        else
            document.writeln("false");*/

        tps.addTransaction(new AddToNumTransaction(num, 10));
        assert.strictEqual(15, num.getNum());
        assert.strictEqual(2, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(2, tps.getUndoSize());
        
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
    }

    testAndMask = () => {
        tps = new jsTPS();
        num = new Num();
        var assert = require('assert');

        assert.strictEqual(0, num.getNum());

        tps.addTransaction(new AddToNumTransaction(num, 12));
        tps.addTransaction(new AndMaskTransaction(num, num.getNum(), 4));

        assert.strictEqual(4, num.getNum());
        assert.strictEqual(2, tps.getSize());
        
        tps.undoTransaction();
        assert.strictEqual(12, num.getNum());
        assert.strictEqual(2, tps.getSize());
        assert.strictEqual(1, tps.getRedoSize());
        assert.strictEqual(1, tps.getUndoSize());
    }

    testUndo = () => {
        tps = new jsTPS();
        num = new Num();
        var assert = require('assert');

        assert.strictEqual(num.getNum(), 0);
        assert.strictEqual(tps.hasTransactionToUndo(), false);
        assert.strictEqual(tps.hasTransactionToRedo(), false);

        tps.addTransaction(new AddToNumTransaction(num, 5));
        tps.addTransaction(new AddToNumTransaction(num, 10));
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(tps.hasTransactionToRedo(), false);
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
        
        tps.undoTransaction();
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(tps.hasTransactionToRedo(), true);
        assert.strictEqual(15, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(1, tps.getRedoSize());
        assert.strictEqual(2, tps.getUndoSize());

        tps.undoTransaction();
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(tps.hasTransactionToRedo(), true);
        assert.strictEqual(5, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(2, tps.getRedoSize());
        assert.strictEqual(1, tps.getUndoSize());

        tps.undoTransaction();
        assert.strictEqual(tps.hasTransactionToUndo(), false);
        assert.strictEqual(tps.hasTransactionToRedo(), true);
        assert.strictEqual(0, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(3, tps.getRedoSize());
        assert.strictEqual(0, tps.getUndoSize());
        
        // this should do nothing, no undos left 
        tps.undoTransaction();
        assert.strictEqual(tps.hasTransactionToUndo(), false);
        assert.strictEqual(tps.hasTransactionToRedo(), true);
        assert.strictEqual(0, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(3, tps.getRedoSize());
        assert.strictEqual(0, tps.getUndoSize());
    }

    testRedo = () => {
        tps = new jTPS();
        num = new Num();
        var assert = require('assert');

        assert.strictEqual(num.getNum(), 0);
        
        tps.addTransaction(new AddToNumTransaction(num, 5));
        tps.addTransaction(new AddToNumTransaction(num, 10));
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(tps.hasTransactionToRedo(), false);
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());

        tps.undoTransaction();
        tps.doTransaction();
        assert.strictEqual(tps.hasTransactionToUndo(), true);
        assert.strictEqual(tps.hasTransactionToRedo(), false);
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());

        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.strictEqual(true, tps.hasTransactionToUndo());
        assert.strictEqual(false, tps.hasTransactionToRedo());
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
        

        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.strictEqual(true, tps.hasTransactionToUndo());
        assert.strictEqual(false, tps.hasTransactionToRedo());
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());


        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.strictEqual(true, tps.hasTransactionToUndo());
        assert.strictEqual(true, tps.hasTransactionToRedo());
        assert.strictEqual(15, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(1, tps.getRedoSize());
        assert.strictEqual(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.strictEqual(true, tps.hasTransactionToUndo());
        assert.strictEqual(false, tps.hasTransactionToRedo());
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
    }

    testClear = () => {
        tps = new jsTPS();
        num = new Num();
        var assert = require('assert');

        assert.strictEqual(num.getNum(), 0);
        tps.addTransaction(new AddToNumTransaction(num, 5));
        tps.addTransaction(new AddToNumTransaction(num, 10));
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());

        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        assert.strictEqual(35, num.getNum());
        assert.strictEqual(0, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNumTransaction(num, 5));
        tps.addTransaction(new AddToNumTransaction(num, 10));
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(70, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        assert.strictEqual(70, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNumTransaction(num, 5));
        tps.addTransaction(new AddToNumTransaction(num, 10));
        tps.addTransaction(new AddToNumTransaction(num, 20));
        assert.strictEqual(105, num.getNum());
        assert.strictEqual(3, tps.getSize());
        assert.strictEqual(0, tps.getRedoSize());
        assert.strictEqual(3, tps.getUndoSize());
    }
}