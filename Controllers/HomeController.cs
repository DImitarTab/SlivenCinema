using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SlivenCinema.Models;
using SlivenCinema.Models.enums;
using SlivenCinema.ViewModel;
using SlivenCinema.ViewModels;
using System.Diagnostics;
using System.Net;
using System.Text.RegularExpressions;

namespace SlivenCinema.Controllers
{
	public class HomeController : Controller
	{
		private readonly MovieContext _context;

		public HomeController(MovieContext context)
		{
			_context = context;
		}	

		public ActionResult Index()
		{
			var Today = DateTime.Today;
            var movieList = _context.Movies.Include(x => x.Screening).Where(x => x.Screening.Any(y => y.Time.Date == Today)).ToList();

			var newMovieList = AddMovieViewModel(movieList, Today);

            return View(newMovieList);
		}

		

        public PartialViewResult _Movies(DateTime Today)
		{
			var movieList = _context.Movies.Include(x => x.Screening).Where(x => x.Screening.Any(y => y.Time.Date == Today)).ToList();

            var newMovieList = AddMovieViewModel(movieList, Today);

			for (int i = 0; i < newMovieList.Count; i++)
			{
				newMovieList[i].Screening.OrderBy(x => x.Time.Date).ThenBy(x=>x.Time.TimeOfDay);
			}

            return PartialView("_Movies", newMovieList);
		}


        public List<MoviesListViewModel> AddMovieViewModel(List<Movie> movieList, DateTime Today)
        {
            var newMovieList = new List<MoviesListViewModel>();
            for (int i = 0; i < movieList.Count; i++)
            {
                var newMovie = new MoviesListViewModel();
                newMovie.MovieID = movieList[i].MovieID;

                newMovie.Title = movieList[i].Title;
                newMovie.Rating = movieList[i].Rating;
                newMovie.ImagePath = movieList[i].ImagePath;

                for (int j = 0; j < movieList[i].Screening.Count; j++)
                {

                    if (movieList[i].Screening[j].Time.Date == Today)
                    {
                        newMovie.Screening.Add(movieList[i].Screening[j]);

                    }

                }
				
                newMovieList.Add(newMovie);
            }
			
            return newMovieList;
        }
        public IActionResult Privacy()
		{
			return View();
		}


		[HttpPost]
		public ActionResult SelectMovie(TimeSpan movieTime, string movieName)
		{		
			return RedirectToAction("BookTicket", "Screening", new {movieTime, movieName});
		}

		[HttpPost]
		public ActionResult AddScreening(string movieName, DateTime screeningDate, TimeSpan screeningTime, int movieId)
		{
			

			DateTime screenDate = screeningDate.Date.Add(screeningTime);

			var seats = new List<Seat>();
			for (int i = 1; i <= 8; i++)
			{
				for (char j = 'A' ; j < 'A' + 10; j++)
				{
					seats.Add(new Seat {
						SeatNumber = (i.ToString() + j.ToString()) 
					});
				}
			}

			var screenings = _context.Screenings
				.Where(x => x.Time.TimeOfDay == screeningTime && x.MovieName == movieName && x.Time.Date == screeningDate)
				.FirstOrDefault();
			var screeningMovieId = _context.Movies.Include(x=>x.Screening).Where(x=>x.MovieID==movieId).FirstOrDefault();
			if (screenings == null)
			{
				Screening newScreening = new Screening() { Seats=seats,MovieName=movieName, Time=screenDate};
				
				_context.Add(newScreening);

				_context.SaveChanges();

				screeningMovieId.Screening.Add(newScreening);
				_context.SaveChanges();

				return Ok("hello");
			}

			return Ok("helo");
			
			
		}

		public ActionResult AddMovie(string movieName, DateTime releaseDate, MovieGenres movieGenres, double movieRating, string movieDescription, int movieDuration)
		{

			var movie = _context.Movies.Where(x => x.Title == movieName).FirstOrDefault();

			if (movie == null)
			{
				Movie newMovie = new Movie();
				newMovie.Rating = movieRating;
				newMovie.Title = movieName;
				newMovie.Description = movieDescription;
				newMovie.Duration = movieDuration;
				newMovie.ReleaseDate = releaseDate;
				newMovie.ImagePath = Regex.Replace(movieName, @"[^\w\s]", "").Replace(" ", "-").ToLower();
				newMovie.Genre = movieGenres;
				newMovie.Screening = new List<Screening>();

				_context.Add(newMovie);
				_context.SaveChanges();
				return Ok("hello");
			}
			else return Ok("helo");
			

		}
		public async Task<ActionResult> ComingSoon()
		{
			var movieList = _context.Movies.Include(x => x.Screening).Where(x=>x.ReleaseDate.Date>DateTime.Today).ToList();
			return View(movieList);
		}
		public async Task<ActionResult> About()
		{

			return View();
		}
		public ActionResult CinemaLayout(int EventID)
		{			
			
			Screening eventModel = new Screening();
			return PartialView(eventModel);

		}
		public ActionResult Movie(int movieId)
		{
			var movieID = _context.Movies.Include(x=>x.Screening).Where(x=>x.MovieID == movieId).FirstOrDefault();
	
	
			return View(movieID);
		}
		public List<Movie> getMovies()
		{
			var getMovies = _context.Movies.ToList();
			return getMovies;
		}
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}