class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
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
    url: 'http://localhost:3000/acounts',
    dataType: 'json',
  }).done((data) => {
    console.log('data ajax get', data);
  });
}


export function addNewAccount(cName){
//  console.log('entrou na funcao NewAccount '  + cName);
//post - sending data
$.ajax({
  method: 'post',
  newAccount: {
    username: cName,
    transactions: [],
  },
  url: 'http://localhost:3000/acounts',
  dataType: 'json',
}).done((data) => {
  console.log('data ajax post', data);
});

}


// export default {addNewAccount}
// ajax - { method, url, dataType }.done(cb(data));
