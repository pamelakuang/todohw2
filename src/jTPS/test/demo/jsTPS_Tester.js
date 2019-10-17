import Num from './Num';
import jsTPS from '../../src/jtps/jsTPS';

class jsTPS_Tester {

    tps = new jsTPS();
    num = new Num();

    keepGoing = true;
    while(keepGoing) {
        document.writeln("CURRENT jTPS:");
        document.write(this.tps);
        document.writeln("num is ");
        document.write(this.num.getNum);
        document.writeln();
        document.println("1) Add a Transaction");
        document.println("2) Undo a Transaction");
        document.println("3) Redo a Transaction");
        document.println("4) Clear All Transactions");
        document.println("5) Reset Num and Transactions");
        document.print("-");

        entry = prompt("ENTER A SELECTION");
        if (entry.charAt(0) === "1") {
            entry = prompt("\nEnter an amount to add: ");
            let amountToAdd = (int)(entry);
            transaction = new AddToNum_Transaction(this.num, amountToAdd);
            this.tps.addTransaction(transaction);
        }
        else if (entry.charAt(0) === "2") {
            this.tps.undoTransaction();
        }
        else if (entry.charAt(0) === "3") {
            this.tps.doTransaction();
        }
        else if (entry.charAt(0) === "4") {
            this.tps.clearAllTransactions();
        }
        else if (entry.charAt(0) === "5") {
            this.tps.clearAllTransactions();
            this.num.setNum(0);
        }
        else if (entry.charAt(0) === "Q") {
            keepGoing = false;
            document.writeln("GOODBYE");
        }
    }
}