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

	
		public ActionResult BookTicket(DateTime movieTime, string movieName)
		{
			var seats = _context.Screenings.Include(x=>x.Seats).Where(x=>x.MovieName == movieName && x.Time == movieTime).FirstOrDefault();
			var screen = new Screening();
			ViewBag.movieTime = movieTime;
			ViewBag.movieName = movieName;

			return View(seats);
		}

        [HttpPost]

        public ActionResult BookTicket(List<string> selectSeats, DateTime movieTime, string movieName)
		{
			var seats = _context.Screenings.Include(x => x.Seats).Where(s => s.MovieName == movieName && s.Time == movieTime).FirstOrDefault();
			
			
			for (int i = 0; i < seats.Seats.Count(); i++)
			{
				if (selectSeats.Contains(seats.Seats.ToList()[i].SeatNumber))
				{
					seats.Seats.ToList()[i].isTaken = true;
					_context.SaveChanges();
				}
			}
			return View(seats);
		}
		
	}
}
