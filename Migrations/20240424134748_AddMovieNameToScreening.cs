using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlivenCinema.Migrations
{
    public partial class AddMovieNameToScreening : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MovieName",
                table: "Screenings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieName",
                table: "Screenings");
        }
    }
}
