using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myApi.Migrations
{
    /// <inheritdoc />
    public partial class renameOpinionToOpinionsInDbcontext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinion_Books_BookId",
                table: "Opinion");

            migrationBuilder.DropForeignKey(
                name: "FK_Opinion_Users_UserId",
                table: "Opinion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Opinion",
                table: "Opinion");

            migrationBuilder.RenameTable(
                name: "Opinion",
                newName: "Opinions");

            migrationBuilder.RenameIndex(
                name: "IX_Opinion_UserId",
                table: "Opinions",
                newName: "IX_Opinions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Opinion_BookId",
                table: "Opinions",
                newName: "IX_Opinions_BookId");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Opinions",
                table: "Opinions",
                column: "OpinionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinions_Users_UserId",
                table: "Opinions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_Books_BookId",
                table: "Opinions");

            migrationBuilder.DropForeignKey(
                name: "FK_Opinions_Users_UserId",
                table: "Opinions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Opinions",
                table: "Opinions");

            migrationBuilder.RenameTable(
                name: "Opinions",
                newName: "Opinion");

            migrationBuilder.RenameIndex(
                name: "IX_Opinions_UserId",
                table: "Opinion",
                newName: "IX_Opinion_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Opinions_BookId",
                table: "Opinion",
                newName: "IX_Opinion_BookId");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Opinion",
                table: "Opinion",
                column: "OpinionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinion_Books_BookId",
                table: "Opinion",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Opinion_Users_UserId",
                table: "Opinion",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
