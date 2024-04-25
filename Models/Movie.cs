using SlivenCinema.Models.enums;

namespace SlivenCinema.Models
{
	public class Movie
	{
		public int MovieID { get; set; }
		public string? Title { get; set; }
		public double Rating { get; set; }
		public MovieGenres Genre { get; set; }
		public DateTime ReleaseDate { get; set; }
		public List<Screening> Screening { get; set; }



	}
}
