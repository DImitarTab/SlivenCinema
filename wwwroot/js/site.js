let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.nav-list');



$("#menu-icon").on("click", function() {
    (this).classList.toggle('bx-x');
    $('.nav-list').toggleClass('nav-active');
    $('.header').toggleClass('active');
});

$(window).on("scroll", function () {
    $('.nav-list').removeClass('nav-active');
    $('.header').removeClass('active');
})

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


var swiper = new Swiper(".home", {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
});

var swiper2 = new Swiper(".movie", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


document.addEventListener('DOMContentLoaded', (event) => {
    var openPopupBtn = document.getElementById('openTrailerBtn');
    var popup = document.getElementById('popupTrailer');
    var closePopupBtn = document.getElementById('closePopupBtn');
    console.log(popup);
    console.log(openPopupBtn);

    console.log(closePopupBtn);


    openPopupBtn.addEventListener('click', function () {
        popup.style.display = 'flex';
        $("body").toggleClass("body-popups-opened");
    });

    closePopupBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        $("body").removeClass("body-popups-opened");

        stopVideo();
    });

    window.addEventListener('click', function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
            $("body").removeClass("body-popups-opened");

            stopVideo();
        }
    });

    function stopVideo() {
        var iframe = document.getElementById('youtubeVideo');
        iframe.src = iframe.src;
    }
});


$(document).ready(function () {


    $.get("Home/_Movies", function (data) {
        $("#loadPartialView").append(data);
    });

    $(".input").on("click", function () {

        var today = $(this).data('screeningtime');
        console.log(this);

        console.log(today);
        $.get('Home/_Movies', {
            Today: today
        }).done(function (d) {
            $(".full-panel").empty();
            $(".full-panel").append(d);
        });
    });
    
});


$(document).ready(function () {
    
    let url = new URL(document.location);
    let params = url.searchParams;
    let movieName = params.get("movieName");
    let movieTime = params.get("movieTime");
    console.log(movieTime)

    
    console.log(this)
    $(".poster-link").on("click", function () {
        var movieId = $(this).data('movieid');
        console.log(movieId)
        console.log(this)
        $.post('/Home/Movie', {
            movieId: movieId
        })
            .done(function (d) {
                window.location.href = "/Home/Movie";
                console.log("Success")
            })
            .fail(function (xhr, status, error) {
                console.error("error" + error)
            });
    });

    
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

    var btn = document.getElementById("popupBtn");
    var popup = document.getElementById("popupContent");

    // Show the popup when the button is clicked



    $(".sbt-button").on("click", function () {
        if (selectedSeats.length == 0) {

            popup.classList.toggle("show");
            window.addEventListener("click", function (event) {
                if (!event.target.matches('#popupBtn')) {
                    popup.classList.remove("show");
                }
            });
        }
        else {


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
        }
    });  
});

$(document).ready(function () {
    var oldId = null;

    $('.tabs-controls__link').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('tabs-controls__link--active')) {
            return false;
        }

        var currentId = parseInt($(this).data('id'), 10);
        $('.tabs-controls__link--active').removeClass('tabs-controls__link--active');
        $(this).addClass('tabs-controls__link--active');

        if (currentId < oldId) { // item is hidden
            var timing = $('.card.hidden').length * 100;
            $('.card').each(function (index) {
                if (index > (currentId - 1) || index == (currentId - 1)) {
                    window.setTimeout(function () {
                        $('.card').eq(index).removeClass('hidden');
                    }, timing - (index * 100));
                }
            });
        } else {
            $('.card').each(function (index) {
                if (index < (currentId - 1)) {
                    window.setTimeout(function () {
                        $('.card').eq(index).addClass('hidden');
                    }, index * 100);
                }
            });
        }

        oldId = currentId;
    });
});

$(document).ready(function () {


    $(".tabs-controls__link").on("click", function () {
        let dataTime = $(this).data("screeningtime");

        
        $('.screening-time__movietime').each(function (e) {
            let dataScreenTime = $(this).data("screeningtime");
            console.log(dataScreenTime);
            if (dataTime == dataScreenTime) {
                $(this).addClass("screening-time__activated");
            }
            else $(this).removeClass("screening-time__activated");
        });

    });
    //$('.screening-time').click(function (event) {
    //    event.preventDefault();
        
    //    var dataTime = $(this).data('time');
    //    var dataName = $(this).data('moviename');

        
    //    $.post('/Screening/BookTicket', {
    //        movieTime: dataTime,
    //        movieName: dataName
    //    })
    //        .done(function (d) {
    //            window.location.href = "/Screening/BookTicket";
    //            console.log("Success")
    //        })
    //        .fail(function (xhr, status, error) {
    //            console.error("error" + error)
    //        });
    /*});*/

        //var url = "Screening/BookTicket" + '?movieTime=' + encodeURIComponent(dataTime) + '&movieName=' + encodeURIComponent(dataName);
        //console.log(dataTime);
        
        //window.location.assign("/" + "Screening/BookTicket" + '?movieTime=' + encodeURIComponent(dataTime) + '&movieName=' + encodeURIComponent(dataName))
       /* window.location.href = url;*/
        /*sendDataToController(dataTime,dataName);*/
    /*});*/

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
            movieDescription: movieScreening.movieDescription,
            movieDuration: movieScreening.movieDuration,
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