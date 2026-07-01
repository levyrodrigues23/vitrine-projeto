using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitrineAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTeachers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
                table: "WorksDone",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TeacherId",
                table: "Projects",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Lattes = table.Column<string>(type: "text", nullable: false),
                    Field = table.Column<string>(type: "text", nullable: false),
                    AcademicDegree = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorksDone_TeacherId",
                table: "WorksDone",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_TeacherId",
                table: "Projects",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Teachers_TeacherId",
                table: "Projects",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorksDone_Teachers_TeacherId",
                table: "WorksDone",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Teachers_TeacherId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_WorksDone_Teachers_TeacherId",
                table: "WorksDone");

            migrationBuilder.DropTable(
                name: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_WorksDone_TeacherId",
                table: "WorksDone");

            migrationBuilder.DropIndex(
                name: "IX_Projects_TeacherId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "WorksDone");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Projects");
        }
    }
}
