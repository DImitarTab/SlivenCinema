using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SlivenCinema.Migrations
{
    public partial class AddSeatTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies");

            migrationBuilder.AlterColumn<int>(
                name: "ScreeningID",
                table: "Movies",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    SeatID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    isTaken = table.Column<bool>(type: "bit", nullable: false),
                    ScreeningID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.SeatID);
                    table.ForeignKey(
                        name: "FK_Seats_Screenings_ScreeningID",
                        column: x => x.ScreeningID,
                        principalTable: "Screenings",
                        principalColumn: "ScreeningID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seats_ScreeningID",
                table: "Seats",
                column: "ScreeningID");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies",
                column: "ScreeningID",
                principalTable: "Screenings",
                principalColumn: "ScreeningID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "ScreeningID",
                table: "Movies",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Screenings_ScreeningID",
                table: "Movies",
                column: "ScreeningID",
                principalTable: "Screenings",
                principalColumn: "ScreeningID");
        }
    }
}
