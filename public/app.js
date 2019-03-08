$.getJSON("/jorts", function(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      $("#jorts").append("<p data-id='" + data[i]._id + "'>" + 
      "<img src=" + data[i].image + ">" + "<br />" + data[i].text + "</p>");
    }
  });
  
  
  $(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/Jorts/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.text + "</h2>");
        $("#notes").append("<label>Title</label>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<label>Note</label>");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "'id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/Jorts/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
 
  $("#clear-all").on("click", function() {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "/clearall",
      success: function(response) {
        $("#results").empty();
      }
    });
  });