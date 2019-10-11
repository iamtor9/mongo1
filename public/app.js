//get JSON using articles callback ----- with 4 loop 
$.getJSON("/articles", function(data) {

for (let i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// create doc .onclick paragraph()
$(document).on("click", "p", function() {
$("#feedback").empty();
let thisId = $(this).attr("data-id");

//call ajax and 'get' article
$.ajax({
 method: "GET",
 url: "/articles/" + thisId})

 //promise .then 
.then(function(data) {
$("#feedback").append("<h2>" + data.title + "</h2>");
$("#feedback").append("<input id='titleinput' name='title' >");
$("#feedback").append("<textarea id='bodyinput' name='body'></textarea>");
$("#feedback").append("<button data-id='" + data._id + "' id='savefeedback'>Save feedback</button>");

// if statement for inputs feedback data
if (data.feedback) {
    $("#titleinput").val(data.feedback.title);
    $("#bodyinput").val(data.feedback.body);
    }
});
});

//-----------

// button function for feedback, event listener
$(document).on("click", "#savefeedback", function() {

let thisId = $(this).attr("data-id");
$.ajax({
    method: "POST",
    url: "/articles/" + thisId,
        data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
        }
});

.then(function(data) {
     $("#feedback").empty();});
     $("#titleinput").val("");
     $("#bodyinput").val("");
});