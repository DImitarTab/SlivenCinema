const urlParams = new URLSearchParams(window.location.search);

$(document).ready(function() {
    let url = new URL(document.location);
    let params = url.searchParams;
    let movieName = params.get("movieName");
    let movieTime = params.get("movieTime");
    
    
    console.log(this)
    //$(".poster-link").on("click", function () {
    //    var movieId = $(this).data('movieid');
    //    console.log(movieId)
    //    console.log(this)
    //    $.post('/Home/Movie', {
    //        movieId: movieId
    //    })
    //        .done(function (d) {
    //            window.location.href = "/Home/Movie";
    //            console.log("Success")
    //        })
    //        .fail(function (xhr, status, error) {
    //            console.error("error" + error)
    //        });
    //});

    
    let selectedSeats = [];
    $(".seats").on("click", function () {
        $(this).toggleClass("selected");
        var index = selectedSeats.indexOf($(this).data('seatnum'));
        if (index === -1) {
            selectedSeats.push($(this).data('seatnum'));
        } else {
            selectedSeats.splice(index, 1);
        }
        console.log(selectedSeats);
    });



    $(".sbt-button").on("click", function () {
        $.post('/Screening/BookTicket', {
            selectSeats: selectedSeats,
            movieName: movieName,
            movieTime: movieTime

        })
            .done(function (d) {
                location.reload();
                console.log("Success")
        })
            .fail(function (xhr, status, error) {
                console.error("error" + error)
            });
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


$(document).ready(function () {
    $("#movieScreeningForm").on("submit", function (event) {
        event.preventDefault(); 

        var formData = new FormData(this);

        var movieScreening = {};
        formData.forEach(function (value, key) {
            movieScreening[key] = value;
        });
        console.log(movieScreening);


        $.post('/Home/AddScreening', {
            movieName: movieScreening.movieName,
            screeningDate: movieScreening.screeningDate,
            screeningTime: movieScreening.screeningTime,
            movieId: movieScreening.movieId
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