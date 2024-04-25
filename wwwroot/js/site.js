let selectedSeats = [];
const urlParams = new URLSearchParams(window.location.search);
const myTime = urlParams.get("time");

// $(".seats").click(function() {
//   selectedSeats = [];
//   $(".seats:checked").each(function() {
//     var test = this.checked ? $(this).data("seat") : "";
//     selectedSeats.push(test);
//   });
//   $(".form-seats").val(selectedSeats.join(", "));
//   $(this).toggleClass("clicked");
//   $(this)
//     .parent()
//     .toggleClass("selected");
// });

$(function() {
  let url = new URL(document.location);
  let params = url.searchParams;
  let paper = params.get("movie");
  $(".movie-select").val(paper);

  $(".seats").on("click", function() {
    selectedSeats = [];
    $(".seats:checked").each(function() {
      var test = this.checked ? $(this).data("seat") : "";
      selectedSeats.push(test);
    });
    $(".form-seats").val(selectedSeats.join(", "));
    $(this).toggleClass("clicked");
    $(this).parent().toggleClass("selected");
      console.log(this);
      //console.log("as " + $(this));
  });
});

$(document).ready(function () {
    $('.screening-time').click(function (event) {
        event.preventDefault();
        
        var dataTime = $(this).data('time');
        var dataName = $(this).data('moviename');
        var url = "Screening/BookTicket" + '?movieTime=' + encodeURIComponent(dataTime) + '&movieName=' + encodeURIComponent(dataName);
        console.log(dataTime);
        window.location.href = url;
        /*sendDataToController(dataTime,dataName);*/
    });

    //function sendDataToController(dataTime, dataName) {
    //    console.log(dataTime);
    //    window.location.href = '@Url.Action("SelectMovie", "Home", new { movieTime = dataTime, movieName = dataName })';
    //    //$.post('Home/SelectMovie', {
    //    //    movieTime: dataTime,
    //    //    movieName: dataName
    //    //}).done(function (d) {
    //    //    console.log("Success")
    //    //})
    //    //    .fail(function (xhr, status, error) {
    //    //        console.error("error" + error)
    //    //    });
    //}
});