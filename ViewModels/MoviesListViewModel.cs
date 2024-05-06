using SlivenCinema.Models.enums;
using SlivenCinema.Models;

namespace SlivenCinema.ViewModels
{
    public class MoviesListViewModel
    {
        public int MovieID { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public double? Rating { get; set; }
        public MovieGenres Genre { get; set; }
        public List<Screening> Screening { get; set; }  = new List<Screening>();
    }
}
