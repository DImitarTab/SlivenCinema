using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SlivenCinema.Models;
using SlivenCinema.ViewModel;
using System.Diagnostics;
using System.Net;

namespace SlivenCinema.Controllers
{
	public class HomeController : Controller
	{
		private readonly MovieContext _context;

		public HomeController(MovieContext context)
		{
			_context = context;
		}	

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		public async Task<ActionResult<List<Movie>>> AddMovie(Movie movie)
		{
			Movie movie1 = new Movie();
			movie1.Title = "Avengers";
			_context.Movies.Add(movie1);
			await _context.SaveChangesAsync();
			return Ok(await _context.Movies.ToListAsync());

		}

		[HttpPost]
		public ActionResult SelectMovie(TimeSpan movieTime, string movieName)
		{
			var screenView = new ScreeningViewModel() { movieName = movieName, movieTime = movieTime };
			return RedirectToAction("BookTicket", "Screening", new {movieTime, movieName});
		}

		public ActionResult AddScreening(string movieName, DateTime movieDate, TimeSpan movieTime)
		{
			

			DateTime screenDate = movieDate.Date.Add(movieTime);
			//Movie  movie = new Movie();
			//movie.Title = "Avengers";
			//movie.Genre = Models.enums.MovieGenres.Action;
			//movie.Rating = 2.0;
			//movie.ReleaseDate =DateTime.Now;
			//_context.Add(movie);

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

			var screenings = _context.Screenings.Where(x => x.Time.TimeOfDay == movieTime && x.MovieName == movieName && x.Time.Date == movieDate).FirstOrDefault();

			if (screenings == null)
			{
				Screening newScreening = new Screening();
				newScreening.Seats = seats;
				newScreening.MovieName = movieName;
				newScreening.Time = screenDate;
				_context.Add(newScreening);
				_context.SaveChanges();
				return Ok("hello");
			}
			else return Ok("helo");
			// If model state is not valid, return a bad request response
			
		}
		public async Task<ActionResult> ComingSoon()
		{

			return View();
		}
		public async Task<ActionResult> About()
		{

			return View();
		}
		public ActionResult CinemaLayout(int EventID)
		{
			//var events = _context.Screenings.Where(x => x.EventID == EventID).ToList();
			
			Screening eventModel = new Screening();
			return PartialView(eventModel);

		}
		public async Task<ActionResult> Movie()
		{

			return View();
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