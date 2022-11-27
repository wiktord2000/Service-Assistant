using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "updatedAt",
                table: "Services",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "totalNet",
                table: "Services",
                newName: "TotalNet");

            migrationBuilder.RenameColumn(
                name: "totalGross",
                table: "Services",
                newName: "TotalGross");

            migrationBuilder.RenameColumn(
                name: "estimatedTime",
                table: "Services",
                newName: "EstimatedTime");

            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Services",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastDeliveryDate",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastDeliveryDate",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Services",
                newName: "updatedAt");

            migrationBuilder.RenameColumn(
                name: "TotalNet",
                table: "Services",
                newName: "totalNet");

            migrationBuilder.RenameColumn(
                name: "TotalGross",
                table: "Services",
                newName: "totalGross");

            migrationBuilder.RenameColumn(
                name: "EstimatedTime",
                table: "Services",
                newName: "estimatedTime");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Services",
                newName: "createdAt");
        }
    }
}
