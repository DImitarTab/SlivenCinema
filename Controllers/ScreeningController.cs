using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SlivenCinema.Models;
using SlivenCinema.ViewModel;

namespace SlivenCinema.Controllers
{
	public class ScreeningController : Controller
	{
		private readonly MovieContext _context;

		public ScreeningController(MovieContext context)
		{
			_context = context;
		}
		public IActionResult Index()
		{
			return View();
		}

	

		public ActionResult BookTicket(TimeSpan movieTime, string movieName)
		{
			var seats = _context.Screenings.Include(x=>x.Seats).Where(x=>x.MovieName == movieName && x.Time.TimeOfDay == movieTime);
			var screen = new Screening();
			ViewBag.movieTime = movieTime;
			ViewBag.movieName = movieName;

			return View();
		}

		
	}
}
