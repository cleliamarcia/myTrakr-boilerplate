let categoriesArr = [];

export function getCategories(){
//get - reading data
$.ajax({
    method: 'get',
    url: 'http://localhost:3000/categories',
    dataType: 'json',
  }).done((data) => {
    $.each(data, function(index, value) {
      categoriesArr.push(value.name);
      $('select#Categories').prepend(`<option value="${value.name}">${value.name}</option>`);
    });  
  });
}  

export function addCategory(category){
  // Check if username already exists
  let Categories = [];
  categoriesArr.forEach((cat) => {
    Categories= cat.username;
  })

  if (categoriesArr.includes(category)) {
    $('.msg').text("Category already exist, please try another one!");
    return;
  }

  //post - sending data
    $.ajax({
        method: 'post',
        data:JSON.stringify({newCategory: category}),
        url: 'http://localhost:3000/categories',
        dataType: 'json',
        contentType:'application/json'
    }).done((data) => {
        $('select#Categories').prepend(`<option value="${data.name}">${data.name}</option>`);
        $('select#Categories').val("");
        $('input#CategoryName').val("");
        $('input#CategoryName').hide();
        $('button#btnNewCategory').hide();
        $('.msg').text("Category add! ");
    });
}
