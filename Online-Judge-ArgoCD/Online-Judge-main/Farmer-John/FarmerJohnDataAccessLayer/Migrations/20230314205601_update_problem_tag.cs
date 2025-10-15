using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FarmerJohnDataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class update_problem_tag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProblemTags");

            migrationBuilder.RenameColumn(
                name: "TimeLimit",
                table: "Problems",
                newName: "TimeLimitInMilliSeconds");

            migrationBuilder.RenameColumn(
                name: "MemoryLimit",
                table: "Problems",
                newName: "MemoryLimittInKiloBytes");

            migrationBuilder.CreateTable(
                name: "ProblemTag",
                columns: table => new
                {
                    ProblemsProblemId = table.Column<int>(type: "int", nullable: false),
                    TagsTagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemTag", x => new { x.ProblemsProblemId, x.TagsTagId });
                    table.ForeignKey(
                        name: "FK_ProblemTag_Problems_ProblemsProblemId",
                        column: x => x.ProblemsProblemId,
                        principalTable: "Problems",
                        principalColumn: "ProblemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProblemTag_Tags_TagsTagId",
                        column: x => x.TagsTagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ProblemTag_TagsTagId",
                table: "ProblemTag",
                column: "TagsTagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProblemTag");

            migrationBuilder.RenameColumn(
                name: "TimeLimitInMilliSeconds",
                table: "Problems",
                newName: "TimeLimit");

            migrationBuilder.RenameColumn(
                name: "MemoryLimittInKiloBytes",
                table: "Problems",
                newName: "MemoryLimit");

            migrationBuilder.CreateTable(
                name: "ProblemTags",
                columns: table => new
                {
                    ProblemId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemTags", x => new { x.ProblemId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ProblemTags_Problems_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problems",
                        principalColumn: "ProblemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProblemTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ProblemTags_TagId",
                table: "ProblemTags",
                column: "TagId");
        }
    }
}
