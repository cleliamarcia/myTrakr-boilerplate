class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get accountName(){
      return this.username;
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }

}

export function  getAccounts(){

  //get - reading data
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    contentType:"application/json"
  }).done((data) => {
    console.log('data ajax get', data);
  });
}


export function addNewAccount(cName){
//  console.log('entrou na funcao NewAccount '  + cName);

//creating Account instance
let account = new Account(cName)

console.log(account);
//console.log(account.accountName);

//post - sending data
$.ajax({
  method: 'post',
  data:JSON.stringify({newAccount: account}),
  url: 'http://localhost:3000/accounts',
  dataType: 'json',
  contentType:'application/json'
}).done((data) => {
  console.log('data ajax post', data);
});

}

// export default {addNewAccount}
// ajax - { method, url, dataType }.done(cb(data));
