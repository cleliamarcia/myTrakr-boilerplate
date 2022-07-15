import { convertTransactions } from "./Transaction.js";

class Account {
  constructor(username, userid, transactions = []) {
    this.username = username;
    this.userid = userid;
    this.transactions = transactions;
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);
  }

}

let accountsArr = [];
let filter = -1;

export function filterAccount(id){
  // clear table
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
  accountsArr.forEach((tran) => {
    if (tran.userid == id){
       tran.transactions.forEach((element) => {
         $('table#filterTransaction').append(`
        <tr class='id_+${element.id}'>
          <td>${element.id} </td>
          <td>${tran.username}</td>
          <td>${element.transaction}</td>
          <td>${element.category}</td>
          <td>${element.description}</td>
          <td>${element.amount}</td>
          <td>${element.accountIdFrom}</td>
          <td>${element.accountIdTo}</td>
        </tr>`);
       });

      }
    });
   }

export function  getAccounts(){

  $('ul#listSummary').empty();    // clear Account Summary List

  //get - reading data
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    contentType:"application/json"
  }).done((data) => {
 
 $.each(data, function(index, value) {
  const newTransactions = convertTransactions(value.transactions)
  const newAccount = new Account(value.username, value.id, newTransactions)
 
   let balance = parseInt(newAccount.balance);
   if (balance.toString() == "NaN")
   {
    balance = 0;
   }

  $('.AccountCombo').prepend(`<option value="${value.id}">${value.username}</option>`);

 // if (balance > 0){
    $('ul#listSummary').append(`<li id= ${value.id}>${value.username} :  <span>${balance}</span>  </li>`);
 // }

  accountsArr.push(newAccount);
  newAccount.transactions.forEach((tran) => {
  const accountFrom = getAccountName(tran.accountIdFrom);
  const accountTo = getAccountName(tran.accountIdTo);

//   console.log("NOK!  Nao deu certo! username = " + accountFrom);

    $('table#tableTransaction').append(`
       <tr class='id_+${tran.id}'>
       <td>${tran.id} </td>
       <td>${newAccount.username}</td>
       <td>${tran.transaction}</td>
       <td>${tran.category}</td>
       <td>${tran.description}</td>
       <td>${tran.amount}</td>
       <td>${tran.accountIdFrom}</td>
       <td>${tran.accountIdTo}</td>
       </tr>`);

   }); 
});
  });
}

export function getAccountName(accid){
  let name = "";
   accountsArr.forEach((tran) => {
   if (tran.userid == accid ){
    // console.log( "OK! Encontrou o UserName " + tran.username);
     name = tran.username;
   }
      return name;
  });
}

export function getAccountBalance(id) {
  let Account = null;
  accountsArr.forEach((tran) => {
    if (tran.id == id) {
      newAccount = new Account(tran.username, tran.transactions);
    }
  });
  return Account;  
}

export function addNewAccount(cName){
  //creating Account instance
  let account = new Account(cName)

  // Check if username already exists
  let UserNames = [];
  accountsArr.forEach((e) => {
    UserNames= e.username;
  })
  
  if (UserNames.includes(account.username)) {
    $('.msg').text("Account name already used, please try another one!");
    return;
  }

//post - sending data
$.ajax({
  method: 'post',
  data:JSON.stringify({newAccount: account}),
  url: 'http://localhost:3000/accounts',
  dataType: 'json',
  contentType:'application/json'
}).done((data) => {
   accountsArr = data;
   let account = new Account(data.username, data.id)
   $('.msg').text("Congratulations!  Now you are a Wigo Bank Customer! ");
   $('input#AccountName').val("");

   getAccounts();   // update elements at screen with new transaction
   $('this.document').refresh();
});
}

// export default {addNewAccount}
// ajax - { method, url, dataType }.done(cb(data));
