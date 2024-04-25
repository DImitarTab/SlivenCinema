using SlivenCinema.Models;
using Microsoft.EntityFrameworkCore;


namespace SlivenCinema
{
	public class MovieContext : DbContext
	{
		public MovieContext(DbContextOptions<MovieContext> options)
			: base(options)
		{
		}
		public DbSet<Movie> Movies { get; set; }
		public DbSet<Screening> Screenings { get; set; }
		public DbSet<Seat> Seats { get; set; }

	}
}
