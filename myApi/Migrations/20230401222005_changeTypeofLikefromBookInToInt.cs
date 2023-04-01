using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myApi.Migrations
{
    /// <inheritdoc />
    public partial class changeTypeofLikefromBookInToInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "View",
                table: "Opinions",
                type: "nvarchar(360)",
                maxLength: 360,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Like",
                table: "Opinions",
                type: "int",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "View",
                table: "Opinions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(360)",
                oldMaxLength: 360,
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Like",
                table: "Opinions",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
