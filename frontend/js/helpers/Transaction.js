import { getAccountName, getAccounts } from "./Account.js";

class Transaction {
  constructor(transaction) {
    this.accountId     = transaction.accountId;
    this.transaction   = transaction.transaction;
    this.category      = transaction.category;
    this.description   = transaction.description;
    this.amount        = transaction.amount;
    this.accountIdFrom = transaction.accountIdFrom;
    this.accountIdTo   = transaction.accountIdTo;
    this.id            = transaction.id
  }

  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}


class Withdraw extends Transaction {
  get value() {
    return -this.amount;
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}


class Transfer extends Transaction {
  get value() {
    if (this.account == this.accountIdFrom) {
      return -this.amount;
    } else if (this.account == this.accountIdTo) {
      return this.amount;
    }
  }

}

let transactionList = [];

export function  getTransactions(filter){

if (filter == -1){      
$('table#tableTransaction').empty();
$('table#tableTransaction').append(`
 <tr>
  <th>Id</th>
  <th>Username</th>
  <th>Transaction Type</th>
  <th>Category</th>
  <th>Description</th>
  <th>Amount</th>
  <th>From</th>
  <th>To</th>
</tr>
`);
}
else{
  $('table#filterTransaction').empty();
  $('table#filterTransaction').append(`
   <tr>
    <th>Id</th>
    <th>Username</th>
    <th>Transaction Type</th>
    <th>Category</th>
    <th>Description</th>
    <th>Amount</th>
    <th>From</th>
    <th>To</th>
  </tr>
`);
}

//get - reading data
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/transactions',
    dataType: 'json',
    contentType:"application/json"
  }).done((data) => {
  //  console.log('data ajax get Transaction', data);
    transactionList = data;
    //console.log(transactionList);
    //tirei daqui
    getAccounts();
     return data;
  });
}

export function convertTransactions(transactions){

//  console.log(transactions)

    return transactions.map(transaction => {
    if(transaction.transaction === "Deposit"){
      return new Deposit(transaction)
    }

    if(transaction.transaction === "Withdraw"){
      return new Withdraw(transaction)
    }

    if(transaction.transaction === "Transfer"){
      return new Transfer(transaction)
    }

  })
}

export function addTransaction(vTransaction){
  //post - sending data
  $.ajax({
    method: "post",
    data:JSON.stringify({newTransaction: vTransaction}),
    url: 'http://localhost:3000/transaction',
    contentType: "application/json"
  }).done((data) => {
   // console.log('data ajax Transaction Insert', data);
   // console.log(vTransaction);
      getTransactions(-1);

   data.forEach((tran) => {

      if (tran.transaction == 'Deposit')
    {
      
        Transaction = new Deposit(tran.amount, tran.accountId);
        Transaction.value;
    }
  
    if (tran.transaction == 'Withdraw')
    {
        Transaction = new Withdraw(tran.amount, tran.accountId)
        Transaction.value;
    }
  
    
    if (tran.transaction == 'Transfer')
    {
        Transaction = new Transfer(tran.amount, tran.accountId, tran.accountIdFrom, tran.accountIdTo)
        Transaction.value;
    }

    
    
   $('.msg').text("Transaction - "+ tran.transaction+ " complete! ");
   $('div#divAccount').hide();
   $('div#divCategory').hide();
   $('div#divAmount').hide();
   $('div#divTransfer').hide(); 


  });

    //update Account balance



});
}
   
