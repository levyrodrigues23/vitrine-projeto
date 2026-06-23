using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitrineAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeWorkDoneCategoryTypeToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Responsible",
                table: "Projects");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "WorksDone",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Category",
                table: "WorksDone",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Responsible",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
