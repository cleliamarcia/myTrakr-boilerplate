class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
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
    return this.amount;
  }
}


// ajax - { method, url, dataType }.done(cb(data));
//get - reading data
$.ajax({
  method: 'get',
  url: 'http://localhost:3000/transactions',
  dataType: 'json',
}).done((data) => {
  console.log('data ajax get', data);
});


//post - sending data
//$.ajax({
//  method: 'post',
//  newTransaction:{
//    accountId:     "", // account ID for Deposits or Withdraws
//    accountIdFrom: "", // sender ID if type = 'Transfer', otherwise null
//    accountIdTo:   "" // receiver ID if type = 'Transfer', otherwise null
//                     // all info from form
//  },
//  url: 'http://localhost:3000/transaction',
//  dataType: 'json',
//}).done((data) => {
//  console.log('data ajax post', data);
//});
