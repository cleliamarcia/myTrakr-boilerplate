import { addNewAccount } from "./helpers/Account.js";
import { addCategory } from "./helpers/Category.js";

$(() => {

//ACCOUNT  -------------------------------------------------------

//Add New Account - event listeners - button
$('button#btnNewAccount').on('click', (e) => {
  //  console.log('New Account add'); 
  //  console.log($('input#AccountName').val());
  e.preventDefault();
  let account = $('input#AccountName').val();
  
  if (account !== "")
  {
    addNewAccount(account);
  }
  
});


//CATEGORY   -------------------------------------------------------
$('input#CategoryName').hide();
$('button#btnNewCategory').hide();

//Show Add Category button
$('select#Categories').change(() => {
//  console.log($('select#Categories').val());
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
  //console.log('New Category add');
  //console.log($('input#CategoryName').val());

  let category= $('select#Categories').val();
  e.preventDefault();

  if (category !== "")
  {
    addCategory(category);
  }

});

//TRANSACTION ---------------------------------------------------------------------
$('div#divAccount').hide();
$('div#divTransfer').hide();
$('div#divCategory').hide();
$('div#divAmount').hide();


//DEPOSIT - event listeners - radio button
$('input:radio[name="rTransaction"]').change(function(){
  if($(this).val() == 'Deposit'){
   //  alert("Deposit");
     console.log("Transaction Deposit");
     $('div#divAccount').show();
     $('div#divCategory').show();
     $('div#divAmount').show();
     $('div#divTransfer').hide();
   }
});


//WITHDRAW - event listeners - radio button
$('input:radio[name="rTransaction"]').change(function(){
  if($(this).val() == 'Withdraw'){
   //  alert("Withdraw");
     console.log("Transaction Withdraw");
     $('div#divAccount').show();
     $('div#divCategory').show();
     $('div#divAmount').show();
     $('div#divTransfer').hide();
   }
});


//TRANSFER - event listeners - radio button
$('input:radio[name="rTransaction"]').change(function(){
  if($(this).val() == 'Transfer'){
   //  alert("Transfer");
     console.log("Transaction Transfer");
     $('div#divAccount').hide();
     $('div#divCategory').show();
     $('div#divAmount').show();
     $('div#divTransfer').show();
   }
});



});  //end Ready()
