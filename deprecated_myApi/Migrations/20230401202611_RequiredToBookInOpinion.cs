using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myApi.Migrations
{
    /// <inheritdoc />
    public partial class RequiredToBookInOpinion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "Opinions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "BookId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "Opinions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "BookId");
        }
    }
}
