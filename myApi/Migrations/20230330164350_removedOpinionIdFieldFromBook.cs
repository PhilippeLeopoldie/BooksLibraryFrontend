using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myApi.Migrations
{
    /// <inheritdoc />
    public partial class removedOpinionIdFieldFromBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Borrowed",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "BorrowedTime",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GivenBack",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GivenBackTime",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "OpinionId",
                table: "Books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Borrowed",
                table: "Books",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "BorrowedTime",
                table: "Books",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "GivenBack",
                table: "Books",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "GivenBackTime",
                table: "Books",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OpinionId",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
