let selectedSeats = [];
const urlParams = new URLSearchParams(window.location.search);
const myTime = urlParams.get("time");

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

$(document).ready(function () {
    $(".openPopup").on('click', function () {
        $(".popupContainer").show();
    });

    $(".close").on('click', function () {
        $(".popupContainer").hide();
    });

    $(window).on('click', function (e) {
        if (e.target == $(".popupContainer")) {
            $(".popupContainer").hide();
        }
    });
});


//document.getElementById("movieScreeningForm").addEventListener("submit", function (event) {
//    event.preventDefault(); // Prevent the form from submitting traditionally

//    // Get form data
//    var formData = new FormData(this);

//    // Create an object from form data
//    var movieScreening = {};
//    formData.forEach(function (value, key) {
//        movieScreening[key] = value;
//    });

//    // Send the movie screening data to the server (you can use AJAX to send the data)
//    console.log("Movie Name: " + movieScreening.movieName);
//    console.log("Screening Date: " + movieScreening.screeningDate);
//    console.log("Screening Time: " + movieScreening.screeningTime);

//    $.post('@Url.Action("AddScreening")', {
//        movieName: movieScreening.movieName,
//        movieDate: movieScreening.screeningDate,
//        movieTime: movieScreening.screeningTime
//    }).done(function (d) {
//        document.getElementsByClassName("popupContainer").style.display = "none";
//        console.log("Success")
//    })
//        .fail(function (xhr, status, error) {
//            console.error("error" + error)
//        });
//});

$(document).ready(function () {
    $("#movieCreationForm").on("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get form data
        var formData = new FormData(this);

        // Create an object from form data
        var movieScreening = {};
        formData.forEach(function (value, key) {
            movieScreening[key] = value;
        });

        // Send the movie screening data to the server (you can use AJAX to send the data)
        console.log("Movie Name: " + movieScreening.movieName);
        console.log("rating : " + movieScreening.movieRating);
        console.log("genre: " + movieScreening.movieGenre);
        console.log("release Time: " + movieScreening.releaseDate);


        $.post('/Home/AddMovie', {
            movieName: movieScreening.movieName,
            releaseDate: movieScreening.releaseDate,
            movieGenre: movieScreening.movieGenre,
            movieRating: movieScreening.movieRating
        }).done(function (d) {
            $(".popupContainer").hide();
            console.log("Success")
        })
            .fail(function (xhr, status, error) {
                console.error("error" + error)
            });
    });
});

//document.getElementById("movieCreationForm").addEventListener("submit", function (event) {
//    event.preventDefault(); // Prevent the form from submitting traditionally

//    // Get form data
//    var formData = new FormData(this);

//    // Create an object from form data
//    var movieScreening = {};
//    formData.forEach(function (value, key) {
//        movieScreening[key] = value;
//    });

//    // Send the movie screening data to the server (you can use AJAX to send the data)
//    console.log("Movie Name: " + movieScreening.movieName);
//    console.log("rating : " + movieScreening.movieRating);
//    console.log("genre: " + movieScreening.movieGenre);
//    console.log("release Time: " + movieScreening.releaseDate);


//    $.post('Home/AddMovie', {
//        movieName: movieScreening.movieName,
//        releaseDate: movieScreening.releaseDate,
//        movieGenre: movieScreening.movieGenre,
//        movieRating: movieScreening.movieRating
//    }).done(function (d) {
//        document.getElementsByClassName("popupContainer").style.display = "none";
//        console.log("Success")
//    })
//        .fail(function (xhr, status, error) {
//            console.error("error" + error)
//        });
//});