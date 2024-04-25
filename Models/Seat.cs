namespace SlivenCinema.Models
{
	public class Seat
	{
		public int SeatID { get; set; }
		public bool isTaken { get; set; } = false;
		public string SeatNumber { get; set; }
	}
}
