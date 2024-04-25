﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SlivenCinema;

#nullable disable

namespace SlivenCinema.Migrations
{
    [DbContext(typeof(MovieContext))]
    partial class MovieContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.29")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("SlivenCinema.Models.Movie", b =>
                {
                    b.Property<int>("MovieID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MovieID"), 1L, 1);

                    b.Property<int>("Genre")
                        .HasColumnType("int");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MovieID");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("SlivenCinema.Models.Screening", b =>
                {
                    b.Property<int>("ScreeningID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScreeningID"), 1L, 1);

                    b.Property<int?>("MovieID")
                        .HasColumnType("int");

                    b.Property<string>("MovieName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.HasKey("ScreeningID");

                    b.HasIndex("MovieID");

                    b.ToTable("Screenings");
                });

            modelBuilder.Entity("SlivenCinema.Models.Seat", b =>
                {
                    b.Property<int>("SeatID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SeatID"), 1L, 1);

                    b.Property<int?>("ScreeningID")
                        .HasColumnType("int");

                    b.Property<string>("SeatNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isTaken")
                        .HasColumnType("bit");

                    b.HasKey("SeatID");

                    b.HasIndex("ScreeningID");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("SlivenCinema.Models.Screening", b =>
                {
                    b.HasOne("SlivenCinema.Models.Movie", null)
                        .WithMany("Screening")
                        .HasForeignKey("MovieID");
                });

            modelBuilder.Entity("SlivenCinema.Models.Seat", b =>
                {
                    b.HasOne("SlivenCinema.Models.Screening", null)
                        .WithMany("Seats")
                        .HasForeignKey("ScreeningID");
                });

            modelBuilder.Entity("SlivenCinema.Models.Movie", b =>
                {
                    b.Navigation("Screening");
                });

            modelBuilder.Entity("SlivenCinema.Models.Screening", b =>
                {
                    b.Navigation("Seats");
                });
#pragma warning restore 612, 618
        }
    }
}
