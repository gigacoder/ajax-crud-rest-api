$(function(){
  // GET/READ
  $('#get-button').on('click', function(){
    $.ajax({
      url: '/team',
      contentType: 'application/json',
      success: function(response){
        console.log(response);
        var tableContent = $('tbody');
        tableContent.html('');
        response.persons.forEach(function(person){
          tableContent.append('\
                        <tr>\
                            <td class="id">' + person.id + '</td>\
                            <td><input type="text" class="name form-control" value="' + person.name + '"></td>\
                            <td>\
                                <button class="update-button btn btn-info"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>  UPDATE/PUT</button>\
                                <button class="delete-button btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>  DELETE</button>\
                            </td>\
                        </tr>\
                    ');
        });
      }
    });
  });
});




$('#create-form').on('submit', function(event) {
    event.preventDefault();

    var createInput = $('#create-input');

    $.ajax({
        url: '/team',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: createInput.val() }),
        success: function(response) {
            console.log(response);
            createInput.val('');
            $('#get-button').click();
        }
    });
});

//update/PUT

$("table").on('click', '.update-button',function(){
    var tableRow = $(this).closest('tr');
    var id = tableRow.find('.id').text();
    var newName = tableRow.find('.name').val();
    $.ajax({
      url: '/team/' +id,
      method: 'PUT',
      contentType: 'application/json',
      data:JSON.stringify({newName:newName}),
      success:function(response){
        console.log(response);
        $('#get-button').click();
      }
    });
});
//DELETE
$("table").on('click', '.delete-button', function(){
  var tableRow = $(this). closest('tr');
  var id = tableRow.find('.id').text();
  $.ajax({
    url: '/team/' + id,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(response){
      console.log(response);
      $('#get-button').click();
    }
  });
});
