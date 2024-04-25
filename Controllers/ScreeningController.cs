using Microsoft.AspNetCore.Mvc;
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
			ViewBag.movieTime = movieTime;
			ViewBag.movieName = movieName;

			return View();
		}

		
	}
}
