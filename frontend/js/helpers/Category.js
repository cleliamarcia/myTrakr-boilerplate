export function getCategories(){
//get - reading data
$.ajax({
    method: 'get',
    url: 'http://localhost:3000//categories',
    dataType: 'json',
  }).done((data) => {
    console.log('data ajax get', data);
  });
}  

export function addCategory(category){
    console.log('entrou na funcao NewCategory '  + category);
  //post - sending data
    $.ajax({
        method: 'post',
        data:JSON.stringify({newCategory: category}),
        url: 'http://localhost:3000/categories',
        dataType: 'json',
        contentType:'application/json'
    }).done((data) => {
        console.log('data ajax cat post', data);
    
    });
}
