using FarmerJohnDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace FarmerJohnDataAccessLayer;

public class FramerJohnDbContext : DbContext{
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        if (!options.IsConfigured)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));

            options.UseMySql(connectionString, serverVersion);
        }
    }

    public DbSet<UserModel> Users{ get; set; }
    public DbSet<ProblemModel> Problems{ get; set; }
    public DbSet<TagModel> Tags{ get; set; }

    public DbSet<TestCaseModel> TestCases{ get; set; }

    public DbSet<SubmissionModel> Submissions{ get; set; }

    public DbSet<TestcaseVerdictModel> TestcaseVerdicts{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<UserModel>()
            .HasIndex(u => u.UserName)
            .IsUnique();

        modelBuilder.Entity<UserModel>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<ProblemModel>()
            .HasMany(p => p.Tags)
            .WithMany(t => t.Problems)
            .UsingEntity(j => j.ToTable("ProblemTag"));

        modelBuilder.Entity<SubmissionModel>()
            .HasIndex(s => s.ProblemId)
            .IsUnique(false);
    }
}