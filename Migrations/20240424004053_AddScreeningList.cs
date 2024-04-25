using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlivenCinema.Migrations
{
    public partial class AddScreeningList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_ScreeningID",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "ScreeningID",
                table: "Movies");

            migrationBuilder.AddColumn<string>(
                name: "SeatNumber",
                table: "Seats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "MovieID",
                table: "Screenings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Screenings_MovieID",
                table: "Screenings",
                column: "MovieID");

            migrationBuilder.AddForeignKey(
                name: "FK_Screenings_Movies_MovieID",
                table: "Screenings",
                column: "MovieID",
                principalTable: "Movies",
                principalColumn: "MovieID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Screenings_Movies_MovieID",
                table: "Screenings");

            migrationBuilder.DropIndex(
                name: "IX_Screenings_MovieID",
                table: "Screenings");

            migrationBuilder.DropColumn(
                name: "SeatNumber",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "MovieID",
                table: "Screenings");

            migrationBuilder.AddColumn<int>(
                name: "ScreeningID",
                table: "Movies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_ScreeningID",
                table: "Movies",
                column: "ScreeningID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies",
                column: "ScreeningID",
                principalTable: "Screenings",
                principalColumn: "ScreeningID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
