

// Sweet Alert Plugin
$('#clickedSuccess').click(function () {
    swal("Good job!", "You clicked the button!", "success");
});

$('#clickedInfo').click(function () {
    swal("Here's a message!", "It's pretty, isn't it?");
});

$('#clickedLoader').click(function () {
    swal({
        title: "Ajax request example",
        text: "Submit to run ajax request",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      }, function () {
        setTimeout(function () {
          swal("Ajax request finished!");
        }, 2000);
      });
});

$('#clickedDeleted').click(function () {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
      },
      function(){
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      });
});

// Register User
$('#submit').click(register);

function register(e) {
  e.preventDefault();
  swal("Good job!", "You are registered!", "success");
  let firstName = $('#firstName').val();
  let lastName = $('#lastName').val();
  let email = $('#email').val();
  let newUser = `${firstName} ${lastName} - ${email}`;

  let users = $('.list-group');
  let newList = $('<li>')
  newList.addClass('list-group-item');
  newList.text(newUser);

  let closeBtn = $('<a>X</a>')
    .addClass('btn btn-danger float-right closeBtn p-1 text-light').click(removeUser);

  newList.append(closeBtn);
  users.append(newList);
}

$('.closeBtn').click(removeUser);


function removeUser() {
    let currentUser = $(this).parent();
    swal({
      title: "Are you sure?",
      text: "You will not be to recover after!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "Curent user has been deleted!", "success");
      currentUser.remove();
    });
};
