import { addNewAccount, filterAccount, getAccountName, getAccounts } from "./helpers/Account.js";
import { addCategory, getCategories } from "./helpers/Category.js";
import { addTransaction, getTransactions } from "./helpers/Transaction.js";

$(() => {

//ACCOUNT  -------------------------------------------------------
getAccounts();

//Add New Account - event listeners - button
$('button#btnNewAccount').on('click', (e) => {
  e.preventDefault();
  let account = $('input#AccountName').val();

  // valide is empty account
  if (account !== "")  
  {   
    addNewAccount(account);
  }
  else{
    $('.msg').text("...Account Name must be filled to Open your Account! Try again!");
  }
  
});


//CATEGORY   -------------------------------------------------------
$('input#CategoryName').hide();
$('button#btnNewCategory').hide();

//Update select with data from server
  getCategories();


//Show Add Category button
$('select#Categories').change(() => {
  let category= $('select#Categories').val();

  if (category === "new")
  {
    $('input#CategoryName').show();
    $('button#btnNewCategory').show();
  }
  else{
    $('input#CategoryName').hide();
    $('button#btnNewCategory').hide();
  }
});


//Add New Category - event listeners - button
$('button#btnNewCategory').click((e) => {
  let vCategory= $('input#CategoryName').val();
  e.preventDefault();

  // validate is empty category
  if (vCategory !== "")
  {
    addCategory(vCategory);
  }
  else
  {
    $('.msg').text("...Category must be filled! Try again!");
  }
});

//TRANSACTION ---------------------------------------------------------------------
$('div#divAccount').hide();
$('div#divTransfer').hide();
$('div#divCategory').hide();
$('div#divAmount').hide();
$('table#filterTransaction').hide();

getTransactions(-1);  // show all transaction default

let transaction = "";

//TRANSACTION TYPE - event listeners - radio button
$('input:radio[name="rTransaction"]').change(function(){
  transaction= $(this).val();
//  console.log(transaction);

  //DEPOSIT ============================================
  if( transaction == 'Deposit'){
 
    $('.msg').text("...Fill the information about your Deposit! ");

     $('div#divAccount').show();
     $('div#divCategory').show();
     $('div#divAmount').show();
     $('div#divTransfer').hide();
   }

   //WITHDRAW ==========================================
   if(transaction == 'Withdraw'){
 
    $('.msg').text("...Fill the information about your Withdraw! ");

      $('div#divAccount').show();
      $('div#divCategory').show();
      $('div#divAmount').show();
      $('div#divTransfer').hide();
    }

    //TRANSFER ==================================================
  if(transaction == 'Transfer'){
   
     $('.msg').text("...Fill the information about your Transfer! ");
     $('div#divAccount').hide();
     $('div#divCategory').show();
     $('div#divAmount').show();
     $('div#divTransfer').show();
   }
  
});

//Add New Transaction - event listeners - button
$('button#btnAddTransaction').click((e) => {
  e.preventDefault();
  
  const vTransaction = {
    accountId: $('select#Accounts').val(),
    accountIdFrom: $('select#From').val(),
    accountIdTo: $('select#To').val(),
    amount: parseFloat($('.Amount').val()),
    transaction: transaction,
    description: $('.Description').val(),
    category: $('select#Categories').val()
  };

  console.log(vTransaction.category)
  //VALIDATE DATA BEFORE COMPLETE THE TRANSACTION

  if (transaction == "Transfer"){
    // Check account FROM e TO required.
    if ($('select#From').val() == null || $('select#To').val() == null  ||  $('select#From').val() == $('select#To').val()) {
      $('.msg').text("Account FROM and TO is required to complete your transaction, and must be different, please choose them!");
      return;
    }
   
    // -NOK  -  Check account balance   
    // console.log(accountsArr);
    //accountsArr.forEach((tran) => {
    //  if (tran.userid == $('select#From').val()){
    //    if (tran.balance < parseFloat($('.Amount').val())) {
    //   $('.msg').text("You don`t have enough balance to complete this transaction, please try another time!");
    //   return;
    // }
    //  }
// });
}
  else
  {
    // Check account required.
    if ($('select#Accounts').val() == "" || $('select#Accounts').val() == null) {
      $('.msg').text("Account is required to complete your transaction, please choose one!");
      return;
    }
 }
  
  // Check amount if it is greater than 0.
  if ($('.Amount').val() == null || $('.Amount').val() <= 0) {
    $('.msg').text("Amount need to be greater than 0, please try another value!");
     return;
   }

  // Check if category is selected
  if ($('select#Categories').val() == "" || $('select#Categories').val() == null ) {
    $('.msg').text("Choose one category to complete your transaction, please try again!");
    return;
  }

  if (transaction !== "")
  {
    addTransaction(vTransaction);
  }

});

// Filter Transaction -  event listener
  $('select#AccountsFilter').change((e) => {
    const filter = $('select#AccountsFilter').val();
  //  console.log(filter);
    
    $('.msg').text("...Filtering the Transaction Report! ");
    //    getTransactions(filter);
      
    if (filter != -1) {
    //   console.log('.id_'+filter);
       filterAccount(filter);

        $('table#tableTransaction').hide();
        $('table#filterTransaction').show();
     } else {
     //  console.log("ALL");
        getAccounts();
        $('table#tableTransaction').show();
        $('table#filterTransaction').hide();
    }
  });

});  //end Ready()
