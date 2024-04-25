using System.ComponentModel.DataAnnotations.Schema;

namespace SlivenCinema.Models
{
	public class Screening
	{
		public int ScreeningID { get; set; }

		public string MovieName { get; set; }
		public DateTime Time { get; set; }

		public IEnumerable<Seat> Seats { get; set; }

	}
}
