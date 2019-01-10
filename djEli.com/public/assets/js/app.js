$(document).ready(function() {

  $("#username").text(getCookie("username"));
  // When the page loads, grab all of our data
  function getBooks() {
    
	  $.get('/api/books/all', function(data) {
	  	books = data;
	    if (data.length !== 0) {
        
	      for (var i = 0; i < data.length; i++) {
        
          var hours =  data[i].endTime - data[i].startTime;
          var Amt = hours * 60;
          var totalAmt = (Amt < 300) ? 300:Amt;
          var balDue =  totalAmt - data[i].deposit;
          
          console.log(hours);

          $("#table > tbody").append("<tr><th>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td><td>" + data[i].address + "</td><td>" + data[i].date + "</td><td>" + data[i].startTime + ":00 PM" + "</td><td>" + data[i].endTime + ":00 PM" + "</td><td>" +  hours + "</td><td>" + "$" + totalAmt + "</td><td>" + "$" + data[i].deposit +"</td><td>" + "$" + balDue + "</td><td>" + data[i].mileage + "</td><td>" + "<button class='btn btn-dark text-white food-edit' data-edit='" + data[i].id + "'>Edit</button> <button class='btn btn-dark text-white food-delete' data-delete='" + data[i].id + " '>Delete</button>" + "</td></th>");
	      }
      }
      
	  });
  }


  
  function getEventDate() {
    
	  $.get('/api/books/all', function(data) {
	  	books = data;
	    if (data.length !== 0) {

        var hours =  data[data.length-1].endTime - data[data.length-1].startTime;
        var Amt = hours * 60;
        var totalAmt = (Amt < 300) ? 300:Amt;
        var balDue =  totalAmt - data[data.length-1].deposit;
        
        $("#date").append("<h3>"+data[data.length-1].date + "</h3>");
        $("#date2").append("<h3>"+data[data.length-2].date + "</h3>");
        $("#date3").append("<h3>"+data[data.length-3].date + "</h3>");
        $("#date4").append("<h3>"+data[data.length-4].date + "</h3>");

        $(".name").append("<b>"+ data[data.length-1].name + "</b>");
        $("#address").append("<b>"+ data[data.length-1].address + "</b>");
        $("#EveDate").append("<b>"+ data[data.length-1].date + "</b>");
        $("#hours").append("<b>"+ hours + "-hour" + " " + "</b>");
        $("#start").append("<b>" + data[data.length-1].startTime + ":00 PM" + "</b>");
        $("#end").append("<b>" + data[data.length-1].endTime + ":00 PM" + "</b>");
        $("#depo").append("<b>" + "$" + data[data.length-1].deposit + "</b>");
        $("#balDue").append("<b>" + "$" + balDue + "</b>");
        $("#totAmt").append("<b>" + "$" + totalAmt + "</b>");
      }
    });
  }
  

 // Getting orders from database when page loads
 getBooks();
 getEventDate();

$(document).on("click", "button#abc", assignUser);


  // Adding event listeners for deleting, editing, and adding todos
  // $(document).on("click", ".food-edit", editItem);
  $(document).on("click", ".food-delete", deleteItem);

 

  // This function deletes a order when the user clicks the delete button
  function deleteItem(event) {

    event.stopPropagation();
    var id = $(this).attr("data-delete");
    $.ajax({
      method: "DELETE",
      url: '/api/book/' + id
    }).done(location.reload());
  }


    function assignUser() {
        document.cookie= "username=" + $("input#name").val();
    }
    
    function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var item = $(this).parent().data("item");
    item.complete = !item.complete;
    updateBook(item);
  }

  //  This function updates a todo in our database
  function updateBook(item) {
    $.ajax({
      method: "PUT",
      url: '/api/book/' + id,
      data: item
    }).done(location.reload());
  }

  
});

