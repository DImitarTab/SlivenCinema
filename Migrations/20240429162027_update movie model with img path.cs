using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlivenCinema.Migrations
{
    public partial class updatemoviemodelwithimgpath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Movies");
        }
    }
}
